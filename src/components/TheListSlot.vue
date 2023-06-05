<template>
	<div class="max" v-if="selecction.length > 0">
		<i @click="unSelectAll">close</i>&nbsp;{{ selecction.length }} seleccionado
		<i @click="selectAll">done</i>
	</div>

	<div
		v-for="item in items"
		:key="item.id"
		class="row wave"
		:class="item.selected ? 'selected' : null"
		@click.ctrl="onRowClick(item)"
		title="Ctrl+click "
	>
		<slot name="default" :item="item"></slot>

		<a>
			<i>edit</i>
		</a>
		<a>
			<i>delete</i>
		</a>
	</div>
	<div class="small-divider tiny-margin"></div>
</template>

<script setup>
	//name:'ListItem',
	import { ref, defineAsyncComponent, computed, watch, toRaw } from 'vue'

	//const TheComponent = defineAsyncComponent(() => import('src/components/TheComponent.vue'))

	const props = defineProps({
		items: {
			type: Array,
			default: () => [],
		},
	})

	const selecction = computed(() => props.items.filter(i => i.selected))

	//const emit = defineEmits(['edit', 'delete'])
	const emit = defineEmits(['itemClick', 'selecction'])

	watch(selecction, newValue => emit('selecction', toRaw(newValue)))

	function onRowClick(item) {
		item.selected = !item.selected
		emit('itemClick', item)
	}

	function unSelectAll() {
		props.items.forEach(i => (i.selected = false))
	}

	function selectAll() {
		props.items.forEach(i => (i.selected = true))
	}
</script>

<style scoped>
	div.selected::before {
		font-family: 'Material Icons';
		color: #fff;
		font-size: 1.1rem;
		content: 'done';
		position: absolute;
		padding: 0;
		/* top: -3px;
		right: -3px; */
		left: 15px;
		top: 3px;

		width: 1.2rem;
		height: 1.2rem;
		background-color: #16a34a;
		border-radius: 100%;
		border: 3px solid #fff;
		z-index: 100;
	}
</style>
