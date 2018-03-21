<template>
	<div class="chatContainer">
		<div class="logoutButton" @click="Logout()">
			Logout
		</div>
		<!--<channels :channels="channels" :current="currentChannel" @selectChannel="onSelectChannel"></channels>-->
		<channels></channels>
		<div class="right">
			<!--<chatHistory :messages="messages"></chatHistory>-->
			<!--<chat @sendMessage="sendMessage"></chat>-->
			<chatHistory></chatHistory>
			<chat></chat>
		</div>
	</div>
</template>

<script>
	import auth from '../libs/auth';
	import Channels from '../components/channels.vue'
	import ChatHistory from '../components/chatHistory.vue'
	import Chat from '../components/chat.vue'

	export default {
		methods: {
			Logout(){
				auth.logout();
				this.$router.push("/login");
			}
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
