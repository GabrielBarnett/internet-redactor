import keytar from 'keytar';

const SERVICE_NAME = 'internet-redactor';

export class SecureStore {
  static async setSecret(account: string, value: string): Promise<void> {
    await keytar.setPassword(SERVICE_NAME, account, value);
  }

  static async getSecret(account: string): Promise<string | null> {
    return keytar.getPassword(SERVICE_NAME, account);
  }

  static async deleteSecret(account: string): Promise<boolean> {
    return keytar.deletePassword(SERVICE_NAME, account);
  }
}
