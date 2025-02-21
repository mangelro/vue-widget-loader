<template>
	<template v-if="submenu.length > 0 && isAuthorized()">
		<li>
			<i>arrow_drop_down</i>
			<details class="max">
				<summary>{{ title }}</summary>
				<ul class="list border no-space">
					<MenuLink v-for="item in submenu" v-bind="item" :key="item.id" :user-roles />
				</ul>
			</details>
		</li>
	</template>
	<template v-else-if="isAuthorized()">
		<li>
			<router-link :to activeClass="orange4" exactActiveClass="orange4" >
				<i>{{ icon }}</i>
				<div class="max">
					<h6 class="small">{{ title }}</h6>
					<div class="small-text">{{ caption }}</div>
				</div>
			</router-link>
		</li>
	</template>
</template>

<script setup>
	//name:'ItemMenu',
	import { ref, defineAsyncComponent } from 'vue'

	import { isUserAuthorized } from '../utiles/RolesUsuario'

	const props = defineProps({
		title: String,
		caption: String,
		icon:  String,
		to: String,
		allowed: {
			type: [Array,String],
			default: () => [],
		},
		submenu: {
			type: Array,
			default: () => [],
		},
		userRoles: Array,
	})

	function isAuthorized() {
		return isUserAuthorized(props.userRoles, props.allowed)
	}

	
</script>

<style scoped></style>
