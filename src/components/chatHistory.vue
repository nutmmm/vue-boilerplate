<template>
	<div>
		<h2>Messages:</h2>
		<ul>
			<li v-for="message in messages" :key="message._id">
				{{ message.user.nick }}: {{ message.text }}
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

</style>
