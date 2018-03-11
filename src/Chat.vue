<template>
	<div class="chatContainer">
		<channels :channels="channels" :current="currentChannel" @selectChannel="onSelectChannel"></channels>
		<div class="right">
			<chatHistory :messages="messages"></chatHistory>
			<chat @sendMessage="sendMessage"></chat>
		</div>
	</div>
</template>

<script>
	import Channels from './components/channels.vue'
	import ChatHistory from './components/chatHistory.vue'
	import Chat from './components/chat.vue'

	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import client from './libs/client'
	import service from './libs/services'

	export default{
		computed: {
			users() {
				const usersExist = this.currentChannel && this.currentChannel.users
				return usersExist ? this.currentChannel.users : []
			},
			...mapGetters([
				'channels',
				'messages',
				'currentChannel',
				'user'
			])
		},

		methods: {
			...mapMutations([
				'addMessage'
			]),
			...mapActions([
				'getChannels',
				'selectChannel',
				'updateChannel'
			]),
			onSelectChannel(channel) {
				this.selectChannel({ channel, userId: this.user._id })
			},
			sendMessage(message) {
				// Only send if it's connected to a channel
				if (this.currentChannel._id) {
					service.sendMessage(this.currentChannel._id, this.user._id, message)
				}
			}
		},

		created() {
			this.getChannels();

			// Setup events
			client.service("messages").on("created", message => {
				this.addMessage(message)
			})

			client.service("channels").on("patched", channel => {
				this.updateChannel(channel)
			})

			console.log(client.service("messages").on)
		},

		components: {
			Channels,
			ChatHistory,
			Chat
		}
	}
</script>

<style>
	.chatContainer{
		display: flex;
  		flex-wrap: wrap;
		padding: 0px;
		margin: 0px;
		width: 100%;
		height: 100%;
	}
	.right{
		height: 100%;
    	width: calc(100% - 120px);
	}
</style>
