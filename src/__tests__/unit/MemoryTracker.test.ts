import { expect } from 'chai';
import { MemoryTracker } from '../../MemoryTracker';

describe('MemoryTracker', () => {

  it('should be able to create an instance', () => {
    const mt = new MemoryTracker({ memoryUsageLimit: 100 });
    expect(mt instanceof MemoryTracker).to.be.true;
  });

  it('should true if over threshold', () => {
    const mt = new MemoryTracker({ memoryUsageLimit: 100 });
    expect(mt.isOverThreshold()).to.be.true;
  });

  it('should false if not over threshold', () => {
    const twoHundredMB = 200 * 1024 * 1024;
    const mt = new MemoryTracker({ memoryUsageLimit: twoHundredMB });
    expect(mt.isOverThreshold()).to.be.false;
  });
});
