<template>
	<nav >
		<header>
			<img class="circle" src="/vite.svg" />
  </header>

		<a v-for="{ id, icon, title } in MainMenu" :key="id">
			<i>{{ icon }}</i>
			<span>{{ title }}</span>
		</a>
	</nav>
</template>

<script setup>
	//name:'NavigationRail',
	import { ref, defineAsyncComponent } from 'vue'
	import { MainMenu } from '@/utiles/MainMenu'
	//const TheComponent = defineAsyncComponent(() => import('src/components/TheComponent.vue'))

	const props = defineProps({
		userRoles: Array,
	})
</script>

<style scoped></style>
