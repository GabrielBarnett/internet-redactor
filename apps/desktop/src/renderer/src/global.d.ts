import type { InternetRedactorApi } from '../../preload/index';

declare global {
  interface Window {
    internetRedactor: InternetRedactorApi;
  }
}

export {};
