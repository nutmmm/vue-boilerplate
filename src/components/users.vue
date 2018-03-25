<template>
	<div>
		<h4>Users</h4>
		<ul>
			<li v-for="user in users" :key="user.id">
				{{ user }}
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			users: Array
		}
	}
</script>
