<template>
	<div class="inputContainer">
		<textarea v-model="message" class="messageInput"></textarea>
		<button type="button" @click="send" class="messageButton">Send</button>
	</div>
</template>

<script>
	export default {
		data() {
			return { message: '' }
		},
		methods: {
			send() {
				this.$emit("sendMessage", this.message)
				this.message = ""
			}
		}
	}
</script>

<style>
	.inputContainer{
		margin-left: auto;
		height:19%;
		display: flex;
	}

	.messageInput{
		width: 100% !important;
		height: 99% !important;
		display: inline-block;
	}

	.messageButton{
		border: 1px solid black;
		border-radius: 100px;
		padding-left: auto;
		padding-right: auto;
		width:90px !important;
		height: 90px !important;
		margin: 5px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin-top: auto;
	}

	textarea {
		resize: none;
	}
</style>
