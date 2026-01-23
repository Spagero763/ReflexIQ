export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: Record<string, string>;
  body?: any;
  timeout: number;
  retry: boolean;
  retryCount: number;
}

export interface RequestConfig extends RequestOptions {
  baseUrl: string;
  endpoint: string;
}
