<template>
	<div class="row wave" :class="item.selected ? 'selected' : null" @click.ctrl="onRowClick" title="Ctrl+click ">
		<i class="grey-text">schedule</i>
		<div class="max">
			<h6>{{ item.title }}</h6>
			<div>{{ item.description }}</div>
		</div>
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
	import { ref, defineAsyncComponent } from 'vue'

	//const TheComponent = defineAsyncComponent(() => import('src/components/TheComponent.vue'))

	 const props = defineProps({
		item:Object
	 })

	// const props = defineProps({
	// 	id: Number,
	// 	title: String,
	// 	description: String,
	// 	selected: Boolean,
	// })

	//const emit = defineEmits(['edit', 'delete'])
	const emit = defineEmits(['itemClick'])

	function onRowClick() {
		console.log('Hola, mundo')

		emit('itemClick', props.item)
	}
</script>

<style>
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
