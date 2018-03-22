// Initializes the `manager` service on path `/manager`
const createService = require('./manager.class.js');
const hooks = require('./manager.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    name: 'manager',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/manager', createService(options, app));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('manager');

  service.hooks(hooks);
};
