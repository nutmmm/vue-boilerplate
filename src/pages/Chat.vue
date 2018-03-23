<template>
	<div class="chatContainer">
		<div class="logoutButton" @click="Logout()">
			Logout
		</div>
		<!--<channels :channels="channels" :current="currentChannel" @selectChannel="onSelectChannel"></channels>-->
		<channels :channels="channels" @selectChannel="onSelectChannel" @createChannel="onCreateChannel"></channels>
		<div class="right">
			<!--<chatHistory :messages="messages"></chatHistory>-->
			<!--<chat @sendMessage="sendMessage"></chat>-->
			<chatHistory></chatHistory>
			<chat></chat>
		</div>
		<newChannel :class="{hidden: !newChannelDialog}" @cancelDialog="onCancelDialog" @confirmDialog="onConfirmDialog"></newChannel>
	</div>
</template>

<script>
	import Channels from '../components/channels.vue';
	import Users from '../components/users.vue';
	import ChatHistory from '../components/chatHistory.vue';
	import Chat from '../components/chat.vue';
	import NewChannel from '../components/newChannel.vue';

	import { mapGetters, mapMutations, mapActions } from 'vuex';

	import client from '../libs/client'
	import auth from '../libs/auth';
	import service from '../libs/services';

	export default {
		data(){
			return{
				newChannelDialog: false
			}
		},

		created(){
			this.getChannels();

			// Setup events
			/*client.service("messages").on("created", message => {
				this.addMessage(message);
			})

			client.service("channels").on("patched", channel => {
				this.updateChannel(channel);
			})*/
		},

		methods: {
			...mapMutations([
				'addMessage'
			]),

			...mapActions([
				'getChannels',
				'selectChannel',
				'updateChannel',
				'createChannel',
				'addChannel'
			]),

			onSelectChannel(channel) {
				/*console.log(this.user)
				this.selectChannel({ channel, userId: this.user._id });*/
			},

			onCreateChannel(){
				this.newChannelDialog = true;
			},

			onCancelDialog(){
				this.newChannelDialog = false;
			},

			onConfirmDialog(channelName){
				this.createChannel({ name: channelName, userId: this.user._id }).then(res => {
					this.addChannel({ channel: res });
				}).catch(err => {
					console.error(err);
				});
			},
			/*
			sendMessage(message) {
				// Only send if it's connected to a channel
				if (this.currentChannel._id) {
					service.sendMessage(this.currentChannel._id, this.user._id, message);
				}
			},*/
			Logout(){
				auth.logout();
				this.$router.push("/login");
			}
		},

		computed: {/*
			users() {
				const usersExist = this.currentChannel && this.currentChannel.users;
				return usersExist ? this.currentChannel.users : [];
			},*/
			...mapGetters([
				'channels',
				'messages',
				'currentChannel',
				'user'
			])
		},

		components: {
			Channels,
			Users,
			ChatHistory,
			Chat,
			NewChannel
		}
	}
</script>

<style>
	.hidden{
		display: none;
	}

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

	.logoutButton{
		position: fixed;
		right: 30px;
		top: 30px;
		border: 1px solid black;
		border-radius: 100px;
		width:90px !important;
		height: 90px !important;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
