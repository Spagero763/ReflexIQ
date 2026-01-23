export interface StorageData {
  key: string;
  value: any;
  expiresAt?: Date;
  encrypted: boolean;
}

export interface CacheEntry<T> {
  value: T;
  expiresAt: Date;
  hits: number;
  lastAccessed: Date;
}
