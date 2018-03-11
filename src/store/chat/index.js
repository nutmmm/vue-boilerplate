import service from "../../libs/services"
import client from '../../libs/client'

export const state = {
  channels: [],
  messages: [],
  currentChannelId: ""
}

export const mutations = {
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
  getChannels({ commit }) {
    service.getChannels().then(channels => {
      commit("setChannels", channels.data)
    })
  },

  updateChannel({ commit, state }, channel) {
	  console.log("UPDATING!!!")
    commit("updateChannel", channel)

    if (channel._id === state.currentChannelId) {
      commit("setCurrentChannel", channel)
    }
  },

  selectChannel({ commit, state }, { channel, userId }) {
    commit("clearMessages")

    service
      .connectToChannel(userId, channel._id, state.currentChannelId)
      .then(() => {
        commit("setCurrentChannel", channel)

        // Get messages for the current channel
        return service.getMessages(channel._id)
      })
      .then(messages => {
        commit("setMessages", messages.data)
	}).catch(args => {
		console.log(args)
	})
  }
}

export const getters = {
  channels: state => state.channels,
  messages: state => state.messages,
  // For the current channel, instead of maintain 2 objects in the state tree,
  // we keep only the id and here we compute and return the whole object
  currentChannel: state =>
    state.channels.find(c => c._id === state.currentChannelId) || {}
}

export default {
  state,
  mutations,
  actions,
  getters
}
