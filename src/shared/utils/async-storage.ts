import { AsyncLocalStorage } from 'node:async_hooks';
import { NextFunction, Request, Response } from 'express';

import { AsyncStoreEntity } from 'shared/enums';

export class RequestContext {
  private static readonly asyncLocalStorage = new AsyncLocalStorage<Map<string, unknown>>();

  public static applyMiddleware() {
    return (_: Request, __: Response, next: NextFunction): void => {
      this.asyncLocalStorage.run(new Map(), () => {
        // TODO: add correlation ID and request time started to properly track requests

        next();
      });
    };
  }

  public static set<T>(key: AsyncStoreEntity, value: T): void {
    const store = this.asyncLocalStorage.getStore();

    store.set(key, value);
  }

  public static get<T>(key: AsyncStoreEntity): T | undefined {
    const store = this.asyncLocalStorage.getStore();

    return store?.get(key) as T;
  }
}
