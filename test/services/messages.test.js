const assert = require('assert');
const app = require('../../server/src/app');

describe('\'messages\' service', () => {
  it('registered the service', () => {
    const service = app.service('server/src/models');

    assert.ok(service, 'Registered the service');
  });
});
