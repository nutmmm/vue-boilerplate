import service from "../../libs/services";

export const state = {
	// This should contain variables that you would like to preserve
	channels: [],
	messages: [],
	currentChannelId: ""
}

export const mutations = {
	// This should contain methods for modifying the state section but should not be called directly
	addMessage(state, message) {
		if (message.channel === state.currentChannelId) {
			state.messages.push(message)
		}
	},
	setMessages(state, messages) {
		state.messages = messages
	},
	clearMessages(state) {
		state.messages = []
	},

	setChannels(state, channels) {
		state.channels = channels
	},

	addChannel(state, channel){
		state.channels.push(channel);
	},

	setCurrentChannel(state, channel) {
		state.currentChannelId = channel._id
	},
	updateChannel(state, channel) {
		// Update the array reference, so Vue will notice about the change
		state.channels = state.channels.map(
			c => (c._id === channel._id ? channel : c)
		)
	}
}

export const actions = {
	// This should contain methods that do not modify the state directly
	// They may however modify the stat by calling a method in the mutations
	getChannels({ commit, state }) {
		service.getChannels().then(res => {
			commit("setChannels", res.data)
		}).catch(err => {
			console.error(err);
		});

	},

	createChannel({ commit, state }, { name, userId }){
		return service.createChannel(name, userId);
	},

	addChannel({commit, state}, { channel }){
		commit("addChannel", channel)
	},

	updateChannel({ commit, state }, channel) {
		commit("updateChannel", channel)

		if (channel._id === state.currentChannelId) {
			commit("setCurrentChannel", channel)
		}
	},

	selectChannel({ commit, state }, { channel, userId }) {
		commit("clearMessages")

		service.connectToChannel(userId, channel._id, state.currentChannelId).then(() => {
			commit("setCurrentChannel", channel)

			// Get messages for the current channel
			return service.getMessages(channel._id)
		})
		.then(messages => {
			commit("setMessages", messages.data)
		})
	}
}

export const getters = {
	// This should contain methods for retrieving the data from the state
	channels: state => state.channels,
	messages: state => state.messages,
	// For the current channel, instead of maintain 2 objects in the state tree,
	// we keep only the id and here we compute and return the whole object
	currentChannel: state => state.channels.find(c => c._id === state.currentChannelId) || {}
}

export default {
  state,
  mutations,
  actions,
  getters
}
