import type { DeletableItem, SupportedSite } from '@internet-redactor/shared';

export interface ConnectorRuntime {
  preview(site: SupportedSite): Promise<DeletableItem[]>;
  remove(site: SupportedSite, ids: string[]): Promise<{ deleted: string[]; failed: string[] }>;
}

export class DeletionJobSystem {
  constructor(private readonly connectorRuntime: ConnectorRuntime) {}

  async preview(site: SupportedSite): Promise<DeletableItem[]> {
    return this.connectorRuntime.preview(site);
  }

  async execute(site: SupportedSite, ids: string[]): Promise<{ deleted: string[]; failed: string[] }> {
    if (ids.length === 0) {
      throw new Error('At least one item id is required for deletion');
    }

    return this.connectorRuntime.remove(site, ids);
  }
}
