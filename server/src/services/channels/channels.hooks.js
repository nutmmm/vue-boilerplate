const { authenticate } = require('@feathersjs/authentication').hooks;

async function loadUserData(data, context){
	data = (await context.app.service('users').get(data)).nick;
	return data;
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
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
			if(Array.isArray(context.result.data)){
				for (let userArr of context.result.data){
					let newList = [];
					for (let userIdArr of userArr.users){
						newList.push(await loadUserData(userIdArr, context));
					}
					userArr.users = newList;
				}
			}
			console.log(context.result.data[0].users)
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
