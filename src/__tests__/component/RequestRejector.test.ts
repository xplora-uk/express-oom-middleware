import express from 'express';
import request from 'supertest';
import { RequestRejector } from '../../RequestRejector';
import { MemoryTracker } from '../../MemoryTracker';
import { expect } from 'chai';

describe('RequestRejector', () => {

  it('should be able to create an instance and create middleware that rejects requests', (done) => {
    const app = express();

    const mt = new MemoryTracker({ memoryUsageLimit: 100 });
    const rr = new RequestRejector(mt);
    app.use(rr.makeMiddleware());

    expect(rr instanceof RequestRejector).to.be.true;

    request(app)
      .get('/')
      .expect(500)
      .end(function(err, res) {
        if (err) throw err;
        expect('error' in res.body).to.be.true;
        // { error: 'server is busy' }
        done();
      });
  });

  it('should be able to create an instance and create middleware that does not reject requests', (done) => {
    const app = express();

    const twoHundredMB = 200 * 1024 * 1024;
    const mt = new MemoryTracker({ memoryUsageLimit: twoHundredMB });
    const rr = new RequestRejector(mt);

    app.use(rr.makeMiddleware());

    app.get('/', (_req, res) => res.json({ ok: true }));

    expect(rr instanceof RequestRejector).to.be.true;

    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect('error' in res.body).to.be.false;
        done();
      });
  });

});
