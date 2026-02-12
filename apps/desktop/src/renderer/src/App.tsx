import { useMemo, useState } from 'react';

import type { DeletableItem, SupportedSite } from '@internet-redactor/shared';

import { SiteSelector } from './components/SiteSelector';

export function App(): JSX.Element {
  const [site, setSite] = useState<SupportedSite>('reddit');
  const [items, setItems] = useState<DeletableItem[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState('Ready');

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([, checked]) => checked).map(([id]) => id),
    [selected]
  );

  async function previewItems(): Promise<void> {
    setStatus('Loading preview...');
    const loaded = await window.internetRedactor.preview(site);
    setItems(loaded);
    setSelected({});
    setStatus(`Loaded ${loaded.length} items from ${site}`);
  }

  async function deleteSelected(): Promise<void> {
    if (selectedIds.length === 0) {
      setStatus('Select at least one item to delete.');
      return;
    }

    setStatus(`Deleting ${selectedIds.length} item(s)...`);
    const result = await window.internetRedactor.deleteItems(site, selectedIds);
    setItems((current) => current.filter((item) => !result.deleted.includes(item.id)));
    setSelected({});
    setStatus(`Deleted ${result.deleted.length}, failed ${result.failed.length}`);
  }

  return (
    <main>
      <h1>Internet Redactor</h1>
      <p>Use official site APIs for preview + deletion. Automation fallback runs only when APIs are absent.</p>
      <section className="controls">
        <SiteSelector value={site} onChange={setSite} />
        <button onClick={() => void previewItems()}>Preview Deletable Content</button>
        <button onClick={() => void deleteSelected()}>Delete Selected</button>
      </section>
      <p className="status">{status}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={selected[item.id] ?? false}
              onChange={(event) =>
                setSelected((current) => ({
                  ...current,
                  [item.id]: event.target.checked
                }))
              }
            />
            <strong>{item.kind.toUpperCase()}</strong> {item.title} — {item.bodyPreview}
          </li>
        ))}
      </ul>
    </main>
  );
}
