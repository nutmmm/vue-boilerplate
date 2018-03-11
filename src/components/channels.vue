<template>
	<div>
		<h2>Channels:</h2>
		<ul>
			<li v-for="channel in channels" :key="channel._id" @click="changeChannel(channel)">
				{{ channel.name }}
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			channels: Array,
			current: Object
		},
		methods: {
			changeChannel(channel) {
				if (this.current !== channel) {
					this.$emit('selectChannel', channel)
				}
			}
		}
	}
</script>

<style>

</style>
