import process from 'node:process';

export interface MemoryTrackerOptions {
  /**
   * Memory usage limit in bytes.
   * 0 means no limit - turned off
   */
  memoryUsageLimit: number;
}

export class MemoryTracker {
  private options: MemoryTrackerOptions = {
    memoryUsageLimit: 0,
  };

  constructor(options: Partial<MemoryTrackerOptions> = {}) {
    if (options) {
      if (options.memoryUsageLimit) this.options.memoryUsageLimit = options.memoryUsageLimit;
    }
  }

  memoryUsage(): number {
    // @see https://nodejs.org/api/process.html#processmemoryusage
    const memory = process.memoryUsage();
    return memory.heapUsed;
  }

  isOverThreshold(): boolean {
    return (0 < this.options.memoryUsageLimit) && (this.options.memoryUsageLimit < this.memoryUsage());
  }
}
