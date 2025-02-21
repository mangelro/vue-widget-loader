<template>
	<h6>{{ userAuth?.displayName }}&nbsp<{{ userAuth?.email }}></h6>
	<div class="grid">
		<article class="s12 m12 l4" v-if="isAdm">
			<h6>Últimas operaciones</h6>
		</article>
		<article class="s12 m12 l4" v-if="isAdm">
			<h6>Últimas conexiones</h6>
		</article>
		<WidgetOnline v-if="isAdm"></WidgetOnline>
	</div>
</template>

<script setup>
	//name:'Index',

	import { defineAsyncComponent, computed } from 'vue'
	import { useAuthStore } from '@stores/AuthStore'
	import { storeToRefs } from 'pinia'

	const WidgetOnline = defineAsyncComponent(() => import('@components/widgets/UsersConnected.vue'))

	const store = useAuthStore()
	const { userAuth, isAdm } = storeToRefs(store)
</script>
