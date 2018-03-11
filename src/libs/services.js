import client from "./client"

const channelSvc = client.service("channels")
const messagesSvc = client.service("messages")
const usersSvc = client.service("users")

const service = {
  getChannels() {
    return channelSvc.find()
  },

  connectToChannel(myselfId, channelId, currentChannelId) {
    const promises = []

    // Disconnect myself from currentChannel
    if (currentChannelId) {
      promises.push(
        channelSvc.patch(currentChannelId, {
          $pull: { users: myselfId }
        })
      )
    }

    // Add myself to channel
    promises.push(
      channelSvc.patch(channelId, {
        $push: { users: myselfId }
      })
    )

    return Promise.all(promises)
},

  getMessages(channelId) {
    return messagesSvc.find({
      query: {
        channel: channelId
      }
  })
  },

sendMessage(channel, user, text) {
	console.log("CREATED MESSAGE: channel: " + channel + " user: " + user + " text: " + text)
	return client.service("messages").create({ channel, user, text }).catch(err => {
		console.log()
	})
},

	getMsgSvc(){
		return messagesSvc;
	}
}

export default service
