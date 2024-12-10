export class LocalStorage {
    typeStorage: string = 'local';
  
    getItem(key: string): string | null {
      return localStorage.getItem(key);
    }
  
    getItemObject(key: string): any {
      return JSON.parse(localStorage.getItem(key) as string);
    }
  
    removeItem(key: string): void {
      localStorage.removeItem(key);
    }
  
    setItem(key: string, data: any): void {
      const type = typeof data;
      const value = type === 'object' ? JSON.stringify(data) : data.toString();
      localStorage.setItem(key, value);
    }
  
    clear(): void {
      localStorage.clear();
    }
  }
  
  export class SessionStorage {
    typeStorage: string = 'session';
  
    getItem(key: string): string | null {
      return sessionStorage.getItem(key);
    }
  
    getItemObject(key: string): any {
      return JSON.parse(sessionStorage.getItem(key) as string);
    }
  
    removeItem(key: string): void {
      sessionStorage.removeItem(key);
    }
  
    setItem(key: string, data: any): void {
      const type = typeof data;
      const value = type === 'object' ? JSON.stringify(data) : data.toString();
      sessionStorage.setItem(key, value);
    }
  
    clear(): void {
      sessionStorage.clear();
    }
  }
  
  export default class StorageService {
    typeStorage: string;
    storage: LocalStorage | SessionStorage;
  
    constructor(type: string = 'local') {
      this.typeStorage = type;
      this.storage = new LocalStorage();
      this.setStorage();
    }
  
    setConfig(options: { typeStorage?: string }): void {
      if (options.typeStorage) {
        this.typeStorage = options.typeStorage;
        this.setStorage();
      }
    }
  
    setStorage(): void {
      switch (this.typeStorage) {
        case 'session':
          this.storage = new SessionStorage();
          break;
        case 'local':
          this.storage = new LocalStorage();
          break;
        // case 'cookie':
        //   this.storage = new CookieStorage();
        //   break;
        default:
          this.storage = new LocalStorage();
          break;
      }
    }
  
    get(): LocalStorage | SessionStorage {
      return this.storage;
    }
  
    getItem(key: string): string | null {
      return this.storage.getItem(key);
    }
  
    getItemObject(key: string): any {
      const itemStorage = this.getItem(key);
      return itemStorage ? JSON.parse(atob(itemStorage)) : null;
    }
  
    removeItem(key: string): void {
      this.storage.removeItem(key);
    }
  
    setItem(key: string, obj: any): void {
      this.storage.setItem(key, obj);
    }
  
    setItemObject(key: string, obj: any): void {
      const dataTmp = btoa(JSON.stringify(obj));
      this.setItem(key, dataTmp);
    }
  
    clear(): void {
      this.storage.clear();
    }
}