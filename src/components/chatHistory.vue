<template>
	<div class="messageContainer">
		<ul>
			<li v-for="message in messages" :key="message._id" class="message">
				{{message.date}} {{ message.user.nick }}: {{ message.text }}
			</li>
		</ul>
	</div>
</template>

<script>
import store from "../store";

export default {
	props: {
		messages: Array
	}
}
</script>

<style>
	.messageContainer{
		border: 1px solid black;
		height:80%;
		overflow-y: scroll;
	}

	.message{
		display: block;
	}
</style>
