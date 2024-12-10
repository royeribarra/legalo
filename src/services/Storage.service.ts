type StorageType = 'local' | 'session';

export class LocalStorage {
  readonly typeStorage: StorageType = 'local';

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  getItemObject<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  setItem<T>(key: string, data: T): void {
    const value = typeof data === 'object' ? JSON.stringify(data) : String(data);
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export class SessionStorage {
  readonly typeStorage: StorageType = 'session';

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  getItemObject<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  setItem<T>(key: string, data: T): void {
    const value = typeof data === 'object' ? JSON.stringify(data) : String(data);
    sessionStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}

export default class StorageService {
  private storage: LocalStorage | SessionStorage;

  constructor(private typeStorage: StorageType = 'local') {
    this.storage = this.typeStorage === 'session' ? new SessionStorage() : new LocalStorage();
  }

  setConfig(options: { typeStorage?: StorageType }): void {
    if (options.typeStorage) {
      this.typeStorage = options.typeStorage;
      this.storage = this.typeStorage === 'session' ? new SessionStorage() : new LocalStorage();
    }
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  getItemObject<T>(key: string): T | null {
    return this.storage.getItemObject<T>(key);
  }

  setItem<T>(key: string, data: T): void {
    this.storage.setItem<T>(key, data);
  }

  setItemObject<T>(key: string, data: T): void {
    const encodedData = btoa(JSON.stringify(data));
    this.setItem(key, encodedData);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
