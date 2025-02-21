<template>
	<header class="primary-container">
		<nav>
			<button class="circle transparent" @click="showDialog('#dialog-employees')">
				<i>menu</i>
			</button>
		
			<p class="max" >{{ userAuth?.lastLogin ?? '-' }}</p>

			<img height="50" class="" src="https://m.poolred.com/imagenes/logo_Poolredv0_blanco.png" />
			<button class="circle transparent" @click="logout"><i>logout</i></button>
		</nav>
	</header>


	<!-- <NavigationRail class="l left" :user-roles="userAuth?.roles"></NavigationRail> -->
	<MainMenu  :user-roles="userAuth?.roles" :user-name="userAuth?.displayName"></MainMenu>
	<main class="responsive">
		

		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</main>
	<div>
		<p class="small-text">{{ userAuth?.accessToken ?? '' }}</p>
		<hr />
		<p class="small-text">{{ userAuth?.refreshToken ?? '' }}</p>
		<hr />
	</div>
</template>

<script setup>
	import { useAuthStore } from '@stores/AuthStore'
	import { storeToRefs } from 'pinia'
	import { defineAsyncComponent } from 'vue'

	import { useRouter } from 'vue-router'

	const MainMenu = defineAsyncComponent(() => import('@components/MainMenu.vue'))
	//const NavigationRail = defineAsyncComponent(() => import('@components/NavigationRail.vue'))

	const store = useAuthStore()

	const { userAuth } = storeToRefs(store)

	const router = useRouter()

	//watch(userAuth, () => console.log('storeToRefs',userAuth.value))

	function logout() {
		store.logout()
		setTimeout(() => {
			router.push({ name: 'index' })
		}, 200)
	}

	function showDialog(selector) {
		ui(selector)
	}
</script>
