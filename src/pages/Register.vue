<template>
	<div class="center">
		<form>
			<h2>Register:</h2>
			<h3>Name:</h3>
			<input type="text" v-model="user.name" />
			<h3>Email:</h3>
			<input type="text" v-model="user.email" />
			<h3>Password:</h3>
			<input type="text" v-model="user.pass" />
			<div class="error">
				{{ error }}
			</div>
			<div class="buttonContainer">
				<button type="button" @click="Register()">Register</button>
				<button type="button" @click="Redirect('/login')">Or Login?</button>
			</div>
		</form>
	</div>
</template>

<script>
	import auth from '../libs/auth'

	export default {
		data(){
			return {
				user: {
					name: '',
					email: '',
					pass: ''
				},
				error: ''
			}
		},
		methods: {
			Redirect(pageName){
				this.$router.push(pageName);
			},
			Register(){
			//	auth.register(this.user.name, this.user.email, this.user.pass);
				auth.register(this.user.name, this.user.email, this.user.pass).then(
					token => {
						this.$router.push("/");
					}
				).catch(err =>{
					console.log(err);
				})
			}
		}
	}
</script>

<style>
.center > form{
	vertical-align: middle;
	margin-top: -10%;
	box-sizing: border-box;
	border: 1px solid grey;
	border-radius: 10px;
	box-shadow: 5px 5px darkgrey;
	width: 30%;
	padding: 30px;
}

.center{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

form > h2{
	text-align: center;
}

form > input{
	width: 100%;
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
</style>
