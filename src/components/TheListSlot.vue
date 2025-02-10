<template>
	<div class="max" v-if="selectedItems.length > 0">
		<button class="small-round small primary" @click="unSelectAll">
			<i>close</i>
			<span>{{ selectedItems.length }} seleccionados</span>
		</button>

		<button class="small-round small primary" @click="selectAll">
			<i>done</i>
			<span>Select all</span>
		</button>

		<button class="small-round small primary" @click="deleteAll">
			<i>delete</i>
			<span>Delete all</span>
		</button>
	</div>

	<div
		v-for="item in visibleItems"
		:key="item.data.id"
		class="row"
		:class="item.selected ? 'selected' : null"
		@click.ctrl="e => onRowSelected(e, item)"
		@click="onRowClicked(item)"
		title="ctrl+click"
	>
		<slot :item="item.data"></slot>

		<a>
			<i>edit</i>
		</a>
		<a>
			<button class="secondary small small-elevate" @click="e => onRowDeleted(e, item)">
				<i>delete</i>
				<span>eliminar</span>
			</button>
		</a>
	</div>

	
	<div class="small-divider tiny-margin"></div>

	<!--
		Toast para deshacer
	-->
	<app-toast v-model="showToast">
		<span>Eliminados {{ deletedItems.length }}</span>
		<div class="max"></div>
		<button class="small-round small primary no-margin" @click="unRowDeleted">Deshacer</button>
	</app-toast>
</template>

<script setup>
	//name:'ListItem',
	import { ref, computed, defineAsyncComponent } from 'vue'
	import { useCanceler } from '@composables/Canceler.js'

	const AppToast = defineAsyncComponent(() => import('@components/AppToast.vue'))

	const props = defineProps({
		items: {
			type: Array,
			default: () => [],
		},
	})

	const emit = defineEmits(['rowClicked', 'rowSelected', 'rowsDeleted'])

	const { doCommand, cancelCommand } = useCanceler(ClearDeleted)

	const innerItems = ref(props.items.map(i => ({ deleted: false, selected: false, data: i })))

	const deletedItems = computed(() => innerItems.value.filter(i => i.deleted))
	const visibleItems = computed(() => innerItems.value.filter(i => !i.deleted))
	const selectedItems = computed(() => innerItems.value.filter(i => i.selected))

	const showToast = ref(false)

	function ClearDeleted() {
		console.log('ClearDeleted')

		const deleted = innerItems.value.filter(i => i.deleted)

		innerItems.value = innerItems.value.filter(i => !i.deleted)

		if (deleted.length > 0)
			emit(
				'rowsDeleted',
				deleted.map(d => d.data)
			)
	}

	function onRowSelected(e, row) {
		e.stopImmediatePropagation()
		row.selected = !row.selected
		emit('rowSelected', row.data, row.selected)
	}

	function onRowDeleted(e, row) {
		e.stopImmediatePropagation()
		row.deleted = true
		//showToast()
		showToast.value = true
		doCommand()
	}

	function unRowDeleted() {
		deletedItems.value.forEach(i => (i.deleted = false))
		showToast.value = false
		cancelCommand()
	}

	function onRowClicked(row) {
		emit('rowClicked', row.data)
	}

	function onRowEdited(row) {}

	function unSelectAll() {
		innerItems.value.forEach(i => (i.selected = false))
	}

	function selectAll() {
		innerItems.value.forEach(i => (i.selected = true))
	}

	function deleteAll() {
		innerItems.value.forEach(i => {
			if (i.selected) {
				i.deleted = true
			}
		})

		showToast.value = true
		toastTimer.value = setTimeout(() => {
			showToast.value = false
		}, 3_000)
		doCommand()
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
