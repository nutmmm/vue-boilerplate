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
	//let date = userArr.createdAt;
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
				userArr = await loadData(userArr, context);
			}
			return context
		}
	],
    get: [],
    create: [
		async function(context) {
			context.result.user = await loadData(context.result.user, context);
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
//Date.parse(
