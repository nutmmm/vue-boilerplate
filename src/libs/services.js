import client from "./client";

const managerSvc = client.service("manager");
const messagesSvc = client.service("messages");
const usersSvc = client.service("users");

const service = {
	getChannels() {
		return managerSvc.create({req: "getChannels"});
	},

	connectToChannel(myselfId, channelId, currentChannelId) {
		const promises = [];

		// Disconnect myself from currentChannel
		if (currentChannelId) {
			promises.push(
				/*channelSvc.patch(currentChannelId, {
					$pull: { users: myselfId }
				})*/
				managerSvc.create({req: "leaveChannel"})
			);
		}

		// Add myself to channel
		promises.push(
			/*channelSvc.patch(channelId, {
				$push: { users: myselfId }
			})*/
			managerSvc.create({req: "joinChannel"})
		);

		return Promise.all(promises);
	},

	getMessages(channelId) {
		/*return messagesSvc.find({
			query: {
				channel: channelId
			}
		})*/
		return;
	},

	sendMessage(channel, user, text) {
	/*	return client.service("messages").create({ channel, user, text }).catch(err => {
			console.log();
		});*/
		return;
	},

	getMsgSvc(){
		//return messagesSvc;
		return;
	}
}

export default service;
