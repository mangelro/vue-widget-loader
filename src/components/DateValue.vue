<template>
	<div class="field label border">
		<input :value="dateString" type="text" placeholder="dd-mm-yyyy" @keyup="applyMask" maxlength="10" :disabled="disabled" v-focus/>
		<label class="active">{{ label }}</label>
	</div>
</template>

<script setup>
	//name:'DateValue',

	
import { ref, defineAsyncComponent, computed, onMounted, watchEffect } from 'vue'

	//const TheComponent = defineAsyncComponent(() => import('src/components/TheComponent.vue'))

	const props = defineProps({
		label:{
			type: String,
			required: true,
		},
		disabled:{
			type: Boolean,
			default: false,
		},
	})

	const model = defineModel({
		required: false,
		default: () => new Date(),
	})

	const rango = defineModel('rango', {
		required: false,
		default: '',
	})

	const dateString = computed(() => dateToString(model.value))

	watchEffect(() => {
		rango.value = dateToRange(model.value)
	})

	function dateToString(d) {
		return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${d.getFullYear()}`
	}

	function dateToRange(d) {
		return `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d
			.getDate()
			.toString()
			.padStart(2, '0')}`
	}

	const dateRegEx = [
		/^$/, // 0 caracteres
		/^[0-3]$/, // 1 caracter: 0-3
		/^(0[1-9]|[12][0-9]|3[01])$/, // 2 caracteres: 01-31
		/^(0[1-9]|[12][0-9]|3[01])[\/-]$/, // 3 caracteres: 01-31/
		/^(0[1-9]|[12][0-9]|3[01])[\/-][01]$/, // 4 caracteres: 01-31/0-1
		/^(0[1-9]|1\d|2[0-8])[\/-](0[1-9]|1[0-2])|29[\/-]02|30[\/-](0[13-9]|1[0-2])|31[\/-](0[13578]|1[02])$/, // 5 caracteres: 01-31/01-12
		/^(0[1-9]|1\d|2[0-8])[\/-](0[1-9]|1[0-2])|29[\/-]02|30[\/-](0[13-9]|1[0-2])|31[\/-](0[13578]|1[02])[\/-]$/, // 6 caracteres: 01-31/01-12/
		/^(0[1-9]|1\d|2[0-8])[\/-](0[1-9]|1[0-2])|29[\/-]02|30[\/-](0[13-9]|1[0-2])|31[\/-](0[13578]|1[02])[\/-][12]$/, // 7 caracteres: 01-31/01-12/1-2
		/^(0[1-9]|1\d|2[0-8])[\/-](0[1-9]|1[0-2])|29[\/-]02|30[\/-](0[13-9]|1[0-2])|31[\/-](0[13578]|1[02])[\/-](19|20)$/, // 8 caracteres: 01-31/01-12/19-20/
		/^(0[1-9]|1\d|2[0-8])[\/-](0[1-9]|1[0-2])|29[\/-]02|30[\/-](0[13-9]|1[0-2])|31[\/-](0[13578]|1[02])[\/-](19|20)\d$/, // 9 caracteres: 01-31/01-12/19-20/
		/^(0[1-9]|1\d|2[0-8])[\/-](0[1-9]|1[0-2])|29[\/-]02|30[\/-](0[13-9]|1[0-2])|31[\/-](0[13578]|1[02])[\/-](19|20)\d\d$/, // 10 caracteres: 01-31/01-12/19-20/
	]

	function applyMask(e) {

		if (e.keyCode === 8) return

		if (e.keyCode < 96 || e.keyCode > 105) {
			e.target.value = e.target.value.slice(0, -1)
			return
		}

		const regex = dateRegEx[e.target.value.length]

		if (regex && !regex.test(e.target.value)) {
			e.target.value = e.target.value.slice(0, -1) // Eliminar el último carácter si no coincide con la expresión regular
		}
		if (e.target.value.length === 2 || e.target.value.length === 5) {
			e.target.value += '-'
		}

		if (e.target.value.length === 10) {
			const [day, month, year] = e.target.value.split('-')
			model.value = new Date(year, month - 1, day)
			rango.value = dateToRange(model.value)
		}
	}
</script>

<style scoped></style>
