import { MemoryTracker, MemoryTrackerOptions } from './MemoryTracker';
import { RequestRejector, RequestRejectorOptions } from './RequestRejector';

export type ExpressMiddlewareOptions = RequestRejectorOptions & MemoryTrackerOptions;

export function makeExpressMiddleware(options: Partial<ExpressMiddlewareOptions>) {
  const mt = new MemoryTracker({ memoryUsageLimit: options.memoryUsageLimit || 0 });
  const rr = new RequestRejector(mt, {
    httpStatusCode: options.httpStatusCode || 500,
    makeResponsePayload: options.makeResponsePayload || (() => ({ error: 'server is busy', ts: new Date() })),
  });

  return rr.makeMiddleware();
}
