const assert = require('assert');
const app = require('../../server/src/app');

describe('\'manager\' service', () => {
  it('registered the service', () => {
    const service = app.service('manager');

    assert.ok(service, 'Registered the service');
  });
});
