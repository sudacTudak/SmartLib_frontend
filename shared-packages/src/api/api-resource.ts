import type { AxiosInstance } from 'axios';
import type { RequestOptions } from './types';
import { unwrapData } from './unwrap';

const API_PREFIX = '/api/v1';

/**
 * Базовый класс для работы с DRF ViewSet ресурсами.
 * Инкапсулирует конструирование URL, unwrap ответа и проброс AbortSignal.
 */
export class ApiResource<
  TList = unknown,
  TDetail = TList,
  TCreateBody = Partial<TDetail>,
  TPatchBody = Partial<TDetail>,
  TDeleteData = null,
> {
  constructor(
    protected readonly client: AxiosInstance,
    protected readonly basePath: string,
  ) {}

  protected url(suffix = ''): string {
    const base = this.basePath.replace(/\/$/, '');
    if (!suffix) return `${API_PREFIX}/${base}/`;
    const s = suffix.replace(/^\//, '').replace(/\/$/, '');
    return `${API_PREFIX}/${base}/${s}/`;
  }

  async list(params?: Record<string, unknown>, options?: RequestOptions): Promise<TList> {
    const res = await this.client.get(this.url(), { params, signal: options?.signal });
    return unwrapData<TList>(res);
  }

  async get(id: string | number, options?: RequestOptions): Promise<TDetail> {
    const res = await this.client.get(this.url(String(id)), { signal: options?.signal });
    return unwrapData<TDetail>(res);
  }

  async create(body: TCreateBody, options?: RequestOptions): Promise<TDetail> {
    const res = await this.client.post(this.url(), body, { signal: options?.signal });
    return unwrapData<TDetail>(res);
  }

  async partialUpdate(id: string | number, body: TPatchBody, options?: RequestOptions): Promise<TDetail> {
    const res = await this.client.patch(this.url(String(id)), body, { signal: options?.signal });
    return unwrapData<TDetail>(res);
  }

  async delete(id: string | number, options?: RequestOptions): Promise<TDeleteData> {
    const res = await this.client.delete(this.url(String(id)), { signal: options?.signal });
    return unwrapData<TDeleteData>(res);
  }

  async customGet<T>(action: string, params?: Record<string, unknown>, options?: RequestOptions): Promise<T> {
    const res = await this.client.get(this.url(action), { params, signal: options?.signal });
    return unwrapData<T>(res);
  }

  async customPost<T>(action: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const res = await this.client.post(this.url(action), body, { signal: options?.signal });
    return unwrapData<T>(res);
  }

  async customPatch<T>(action: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const res = await this.client.patch(this.url(action), body, { signal: options?.signal });
    return unwrapData<T>(res);
  }

  async customDelete<T>(action: string, options?: RequestOptions): Promise<T> {
    const res = await this.client.delete(this.url(action), { signal: options?.signal });
    return unwrapData<T>(res);
  }
}
