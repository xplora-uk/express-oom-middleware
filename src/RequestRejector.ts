import { NextFunction, Request, Response } from 'express';
import { MemoryTracker } from './MemoryTracker';

export interface RequestRejectorOptions {
  /**
   * Defaults to 500
   */
  httpStatusCode: number;

  /**
   * Defaults to '() => ({ error: "server is busy", ts: new Date() })'
   */
  makeResponsePayload: () => any;
}

export class RequestRejector {
  private options: RequestRejectorOptions = {
    httpStatusCode: 500,
    makeResponsePayload: () => ({ error: 'server is busy', ts: new Date() }),
  };

  constructor(
    private memoryTracker: MemoryTracker,
    options: Partial<RequestRejectorOptions> | null = null,
  ) {
    if (options) {
      if (options.httpStatusCode) this.options.httpStatusCode = options.httpStatusCode;
      if (options.makeResponsePayload) {
        this.options.makeResponsePayload = options.makeResponsePayload;
      }
    }
  }

  makeMiddleware() {
    const _this = this;

    function mw(_req: Request, res: Response, next: NextFunction) {
      if (!_this.isBusy()) return next();

      const payload = _this.options.makeResponsePayload();
      res.status(_this.options.httpStatusCode).json(payload);
    }

    return mw;
  }

  isBusy() {
    return this.memoryTracker.isOverThreshold();
  }
}
