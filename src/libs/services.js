import client from "./client";

const managerSvc = client.service("manager");
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
