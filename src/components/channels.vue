<template>
	<div class="channelListContainer">
		<ul class="channelList">
			<li v-for="channel in channels" :key="channel._id" @click="changeChannel(channel)" class="channel">
				{{ channel.name }}
			</li>
			<li @click="createChannel()" class="channel">
				+
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
					this.$emit('selectChannel', channel);
				}
			},
			createChannel() {
				this.$emit('createChannel');
			}
		}
	}
</script>

<style>
	.channelList{
		display: flex;
		flex-direction: column;
		padding: 0px;
		margin: 0px;
		height:100%;
	}

	.channelListContainer{
		height:100%;
    	width: 115px;
	}

	.channel{
		border: 1px solid black;
		border-radius: 100px;
		padding-left: auto;
		padding-right: auto;
		width: 100px;
		height: 100px;
		margin: 5px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 14px;
	}

	.channel:last-of-type{
		font-size: 30px;
	}
</style>
