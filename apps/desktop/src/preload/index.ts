import { contextBridge, ipcRenderer } from 'electron';

import type { DeletableItem, SupportedSite } from '@internet-redactor/shared';

const api = {
  preview(site: SupportedSite): Promise<DeletableItem[]> {
    return ipcRenderer.invoke('content:preview', { site });
  },
  deleteItems(site: SupportedSite, ids: string[]): Promise<{ deleted: string[]; failed: string[] }> {
    return ipcRenderer.invoke('content:delete', { site, ids });
  }
};

contextBridge.exposeInMainWorld('internetRedactor', api);

export type InternetRedactorApi = typeof api;
