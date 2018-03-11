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
				<button type="button" @click="register()">Register</button>
				<button type="button" @click="login()">Or Login?</button>
			</div>
		</form>
	</div>
</template>

<script>
	import auth from './libs/auth'

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
			login(){
				this.$router.push("/login");
			},

			register(){
				auth.register(this.user.name, this.user.email, this.user.pass).then(
					token => {
						this.$router.push("/");
					}
				).catch(
					args => {
						this.error = 'Error'
					}
				)

			}
		}
	}
</script>

<style>
</style>
