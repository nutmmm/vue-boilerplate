module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
		async function(context) {
			for (let userArr of context.result.data){
				userArr.user = await context.app.service('users').get(userArr.user)
			}
			return context
		}
	],
    get: [],
    create: [
		async function(context) {
			context.result.user = await context.app.service('users').get(context.result.user)
			return context
		}
	],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
