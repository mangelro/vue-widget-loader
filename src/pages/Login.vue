<template>
	<article class="medium middle-align center-align">
		<div class="card">
			<div class="card-header">
				<h5>Login</h5>
			</div>
			<div class="card-content">
				<div class="field border">
					<input
						v-model="auth.accountName"
						id="username"
						type="text"
						placeholder="Enter your username"
						required
					/>
				</div>
				<div class="field border">
					<input
						v-model="auth.password"
						id="password"
						type="password"
						placeholder="Enter your password"
						required
					/>
				</div>
			</div>
			<div class="card-footer">
				<button class="primary" @click="loginUser">Login</button>
			</div>
		</div>
	</article>
	<em>POLDEL|C*36C</em>
	<div id="errorToast" class="snackbar error">{{ error }}</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { service } from '@services/AuthService.js'
	import { useResolver } from '@composables/Resolver.js'
	import { useRouter } from 'vue-router'

	const auth = ref({
		accountName: 'miguel@gmail.com',
		password: 'pass!2px',
		appKey: '91b51999-57cf-4d10-ae10-d632dcce29db',
	})

	const props = defineProps({
		returnUrl: 
		{
			type:String,
			default: '/pool',
		},
	})

	const router = useRouter()

	//const DateValue = defineAsyncComponent(() => import('@components/DateValue.vue'))

	const { tryResolve, error } = useResolver()

	async function loginUser() {
		if (!(await tryResolve(() => service.login(auth.value)))) {
			ui('#errorToast', 1500)
		} else {
			router.push(props.returnUrl)
		}
	}
</script>

<style scoped></style>
