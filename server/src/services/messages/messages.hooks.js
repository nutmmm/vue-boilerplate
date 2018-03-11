


const userSchema = {
  include: {
    service: "users",
    nameAs: "user",
    parentField: "user",
    childField: "_id"
  }
}

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
    create: [],
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
