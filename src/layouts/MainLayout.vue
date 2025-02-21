<template>
	<header class="primary-container">
		<nav class="max center-align">
	

			<img   src="https://m.poolred.com/imagenes/logo_Poolredv0_blanco.png" />
		</nav>
	</header>

	<main class="responsive">
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</main>
</template>

<script setup>
	import { useAuthStore } from '@stores/AuthStore'
	import { storeToRefs } from 'pinia'
	import { defineAsyncComponent } from 'vue'
	import { MainMenu } from '@/utiles/MainMenu'

	const MenuLink = defineAsyncComponent(() => import('@components/MenuLink.vue'))

	const store = useAuthStore()

	const { userAuth } = storeToRefs(store)

	//watch(userAuth, () => console.log('storeToRefs',userAuth.value))

	function showDialog(selector) {
		ui(selector)
	}

	function closeDialog(selector) {
		ui(selector)
	}

	function logout() {
		store.logout()
	}
	async function refreshDialog() {}
</script>
