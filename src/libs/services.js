import client from "./client";

const channelSvc = client.service("channels");
const messagesSvc = client.service("messages");
const usersSvc = client.service("users");

const service = {
	createChannel(name, myselfId){
		return channelSvc.create({ name: name, admins: [myselfId] });
	},

	getChannels() {
		return channelSvc.find({
			query: {

			}
		});
	},

	connectToChannel(myselfId, channelId, currentChannelId) {
		const promises = [];

		// Disconnect myself from currentChannel
		if (currentChannelId) {
			promises.push(
				channelSvc.patch(currentChannelId, {
					$pull: { users: myselfId }
				})
			);
		}

		// Add myself to channel
		promises.push(
			channelSvc.patch(channelId, {
				$push: { users: myselfId }
			})
		);

		return Promise.all(promises);
	},

	getMessages(channelId) {
		return messagesSvc.find({
			query: {
				channel: channelId
			}
		})
	},

	sendMessage(channel, user, text) {
		return client.service("messages").create({ channel, user, text }).catch(err => {
			console.error(err);
		});
	},

	getMsgSvc(){
		return messagesSvc;
	},

	getUser( userId ){
		return channelSvc.find({
			query: {
				_id: userId
			}
		});
	}
}

export default service;
