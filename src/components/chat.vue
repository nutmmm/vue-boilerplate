<template>
	<div>
		<form @submit.prevent="send">
			<input type="text" v-model="message">
			<button type="submit">Send</button>
		</form>
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

</style>
