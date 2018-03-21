<template>
	<div>
		<span @click="Logout()">
			test
		</span>
	</div>
</template>

<script>
	import auth from '../libs/auth'

	export default {
		methods: {
			Logout(){
				auth.logout();
				this.$router.push("/login");
			}
		}
	}
</script>

<style>
</style>
