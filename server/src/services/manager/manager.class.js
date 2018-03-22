const customError = (message => {
	return {
		status: "err",
		message: message
	}
});

const customMessage = (message => {
	return {
		status: "ok",
		message: message
	}
})

/* eslint-disable no-unused-vars */
class Service {
	constructor (options, app) {
		this.options = options || {};
		this.app = app;
	}

	async find (params) {
		return [];
	}

	async get (id, params) {
		return {
			id, text: `A new message with ID: ${id}!`
		};
	}

	async create (data, params) {
	console.log(data);
		if(!data.req){
			//return "Error: Data should be in the following format: { req: \"REQUESTNAME\" }";
			return customError("Data should be in the following format: { req: \"REQUESTNAME\" }");
		}

		switch (data.req) {
			case "getChannels":
				return customMessage(this.app.channels);
			default:
				return customError("Unknown request \"" + data.req + "\"");
		}
		
		return customError("Unknown - reached end of logic");
	}

	async update (id, data, params) {
		return data;
	}

	async patch (id, data, params) {
		return data;
	}

	async remove (id, params) {
		return { id };
	}
}

module.exports = function (options, app) {
	return new Service(options, app);
};

module.exports.Service = Service;
