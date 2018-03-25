const { authenticate } = require('@feathersjs/authentication').hooks;

function parseDate(date){
	return	"["
				+ date.getFullYear() + "/"
				+ (date.getMonth() + 1) + "/"
				+ date.getDate() + ' '

				+ ((date.getHours() + 1) > 9 ? (date.getHours() + 1) : "0" + (date.getHours() + 1)) + ':'
				+ (date.getMinutes() > 9 ? date.getMinutes() :  "0" + date.getMinutes())
			+ "]";
}

async function loadData(data, context){
	data.user = await context.app.service('users').get(data.user);
	data.date = parseDate(data.createdAt);
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
		all: [
			async function(context) {
				if(Array.isArray(context.result.data)){
					for (let userArr of context.result.data){
						userArr = await loadData(userArr, context);
					}

					context.result.data.reverse();
				}
				else{
					context.result = await loadData(context.result, context);
				}

				return context
			}
		],
		find: [],
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
