<template>
	<div>
		<div class="createChannel"></div>
		<div class="popupContainer">
			<form class="popup">
				<h2>Create Channel:</h2>
				<h3>Channel Name:</h3>
				<input type="text" v-model="channelName" />
				<div class="error">
					{{ error }}
				</div>
				<div class="buttonContainer">
					<button type="button" @click="Confirm()">Create Channel</button>
					<button type="button" @click="Cancel()">Cancel</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				channelName: "",
				error: ""
			}
		},
		methods: {
			Cancel(){
				this.channelName = "";
				this.error = "";
				this.$emit("cancelDialog");
			},
			Confirm(){
				this.$emit("confirmDialog", this.channelName);

				//close window and reset values
				this.Cancel();
			}
		}
	}
</script>

<style>
	.createChannel{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;
		opacity: .5;
		background-color: grey;
	}

	.popup{
		vertical-align: middle;
		margin-top: -10%;
		background-color: white;
		border: 1px solid grey;
		border-radius: 10px;
		box-shadow: 5px 5px darkgrey;
		width: 30%;
		padding: 30px;
	}

	.popupContainer{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;
		align-items: center;
		justify-content: center;
		display: flex;
	}

	form > h2{
		text-align: center;
	}

	.buttonContainer > button{
		margin-left: auto;
		margin-right: auto;
		height: 30px;
		flex: 0.3;
	}

	.buttonContainer{
		display: flex;
		margin-top: 30px;
		width: 100%;
		text-align: center;
	}

	.error{
		color: red;
		margin-top: 30px;
	}


	form > input{
		width: 100%;
	}
</style>
