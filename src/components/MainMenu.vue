<template>
	<dialog class="left" id="dialog-employees">
		<header class="fixed">
			<nav>
				<img class="circle" src="/vite.svg" />
				<div class="max">
					<h6>{{ userName ?? '*' }}</h6>
				</div>
				<button class="transparent circle" @click="refreshDialog()"><i>refresh</i></button>
				<button class="transparent circle" @click="closeDialog('#dialog-employees')"><i>close</i></button>
			</nav>

			<ul class="list border no-space">
				<MenuLink v-for="item in MainMenu" v-bind="item" :key="item.id" :user-roles />
			</ul>
		</header>
	</dialog>
</template>

<script setup>
	//name:'MainMenu',
	import { MainMenu } from '@/utiles/MainMenu'
	import { ref, defineAsyncComponent } from 'vue'
	const MenuLink = defineAsyncComponent(() => import('@components/MenuLink.vue'))
	
	const props = defineProps({
		userRoles: Array,

		userName:String
	})

	async function refreshDialog() {}

	
	function closeDialog(selector) {
		ui(selector)
	}
</script>

<style scoped></style>
