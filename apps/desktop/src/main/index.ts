import path from 'node:path';

import { app, BrowserWindow, ipcMain } from 'electron';
import log from 'electron-log/main';

import { DeletionJobSystem } from '@internet-redactor/core';
import { getConnector } from '@internet-redactor/connectors';
import { SecureStore, type AuthSession, DeleteRequestSchema, PreviewRequestSchema } from '@internet-redactor/shared';

const allowedOrigins = new Set<string>(['file://']);
if (process.env.VITE_DEV_SERVER_URL) {
  allowedOrigins.add(new URL(process.env.VITE_DEV_SERVER_URL).origin);
}

log.initialize();

function assertEventOrigin(eventUrl: string): void {
  const parsed = new URL(eventUrl);
  const normalized = parsed.protocol === 'file:' ? 'file://' : parsed.origin;

  if (!allowedOrigins.has(normalized)) {
    throw new Error(`IPC origin rejected: ${normalized}`);
  }
}

async function loadSession(site: AuthSession['site']): Promise<AuthSession> {
  const stored = await SecureStore.getSecret(`oauth:${site}`);
  if (!stored) {
    throw new Error(`Missing OAuth session for ${site}`);
  }

  return JSON.parse(stored) as AuthSession;
}

const connectorRuntime = {
  async preview(site: AuthSession['site']) {
    const auth = await loadSession(site);
    return getConnector(site).previewContent(auth);
  },
  async remove(site: AuthSession['site'], ids: string[]) {
    const auth = await loadSession(site);
    return getConnector(site).deleteContent(auth, ids);
  }
};

const jobSystem = new DeletionJobSystem(connectorRuntime);

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      preload: path.join(app.getAppPath(), 'dist/preload/index.js')
    }
  });

  const devServer = process.env.VITE_DEV_SERVER_URL;
  if (devServer) {
    void win.loadURL(devServer);
  } else {
    void win.loadFile(path.join(app.getAppPath(), 'dist/renderer/index.html'));
  }

  return win;
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('content:preview', async (event, payload) => {
    assertEventOrigin(event.senderFrame.url);
    const input = PreviewRequestSchema.parse(payload);
    return jobSystem.preview(input.site);
  });

  ipcMain.handle('content:delete', async (event, payload) => {
    assertEventOrigin(event.senderFrame.url);
    const input = DeleteRequestSchema.parse(payload);
    return jobSystem.execute(input.site, input.ids);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
