<template>
	<div class="s12">
		<div class="max" v-if="startSelection">
			<i @click="unSelectAll">close</i>&nbsp;{{ selecction.length }} seleccionado
			<i @click="selectAll">done</i>
		</div>
	</div>

	<div class="s12">
		<item-list v-for="(item, index) in items" :key="index" :item="item" @item-click="onItemClick"></item-list>
		<span>Ctrl+Click</span>
	</div>
</template>

<script setup>
	//name:'TheList',
	import { computed } from '@vue/reactivity'
	import { ref, reactive, defineAsyncComponent, watch } from 'vue'

	const ItemList = defineAsyncComponent(() => import('@components/TheItem.vue'))

	//const props = defineProps({})

	const items = reactive([
		{
			id: 1,
			title: 'Hola',
			description: ',mundo',
			selected: false,
		},
		{
			id: 2,
			title: 'Hola',
			description: ',mundo',
			selected: false,
		},
		{
			id: 3,
			title: 'Hola',
			description: ',mundo',
			selected: false,
		},
		{
			id: 4,
			title: 'Hola',
			description: ',mundo',
			selected: false,
		},
		{
			id: 5,
			title: 'Hola',
			description: ',mundo',
			selected: false,
		},
	])

	const startSelection = computed(() => items.some(i => i.selected))
	const selecction = computed(() => items.filter(i => i.selected))

	watch(selecction, () => console.log(selecction.value))

	function onItemClick(item) {
		// const i = items.find(i => i.id === id)
		// if (i) i.selected = !i.selected

		item.selected = !item.selected
	}

	function unSelectAll() {
		items.forEach(i => (i.selected = false))
	}

	function selectAll() {
		items.forEach(i => (i.selected = true))
	}
</script>

<style scoped></style>
