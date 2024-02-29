# express-oom-middleware

Express middleware to reject requests and avoid out of memory (OOM) crashes

## requirements

* Node v18.16.0+

## usage

```sh
npm i @xplora-uk/express-oom-middleware
```

```typescript
import express from 'express';
import { MemoryTracker, RequestRejector } from '@xplora-uk/express-oom-middleware';

const app = express();

const oneGB = 1024 * 1024 * 1024;
const mt = new MemoryTracker({ memoryUsageLimit: oneGB });
const rr = new RequestRejector(mt);

app.use(rr.makeMiddleware());

app.get('/', (_req, res) => res.json({ ok: true }));
```

## maintenance

### installation

```sh
npm i
```

### code

```plain
src/
  __tests__/
    component/
      RequestRejector.test.ts  component tests for RequestRejector
    unit/
      MemoryTracker.test.ts    unit tests for MemoryTracker
  index.ts                     main file that exports features of this library
  MemoryTracker.ts             MemoryTracker can give info about heap memory
  RequestRejector              RequestRejector uses MemoryTracker and creates an express middleware
```

### build

```sh
npm run build
```

### tests

You can run tests with/without coverage info.

```sh
npm run test:unit
npm run test:component
npm run test:coverage
```

Current coverage:

```plain
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |      84 |       50 |     100 |   86.36 |                   
 MemoryTracker.ts   |     100 |    57.14 |     100 |     100 | 16-18             
 RequestRejector.ts |      75 |    44.44 |     100 |   78.57 | 27-29             
--------------------|---------|----------|---------|---------|-------------------
```

### publish

It is important to increment version number using semantic versioning in `package.json` and re-create `package-lock.json`

```sh
# https://docs.npmjs.com/cli/v9/commands/npm-login
# using a member in xplora-uk
npm login

# https://docs.npmjs.com/cli/v9/commands/npm-publish
npm publish --access public
```
