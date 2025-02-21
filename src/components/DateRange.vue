<template>
	<div class="row">
		<DateValue
			:disabled
			class="max"
			v-model="rangeFrom"
			v-model:rango="rangeFromStr"
			label="Fecha desde"
		></DateValue>
		<DateValue :disabled class="max" v-model="rangeTo" v-model:rango="rangeToStr" label="Fecha hasta"></DateValue>
	</div>

	<div class="row">
		<select v-model="selected">
			
			<option value="0">Hoy</option>
			<option value="1">Última semana</option>
			<option value="2">Semana anterior</option>
			<option value="3">Último mes</option>
			<option value="4">Mes anterior</option>
			<option value="5">Útimo año</option>
			<option value="6" v-admin>Entre fechas</option>
		</select>
		<button class="small-round max" @click="previousPeriodo">
			<i>keyboard_double_arrow_left</i>
			<span>Periodo anterior</span>
		</button>
		<button class="small-round max" @click="nextPeriodo">
			<span>Periodo siguiente</span>
			<i>keyboard_double_arrow_right</i>
		</button>
	</div>
</template>

<script setup>
	//name:'DateRange',

	import { ref, defineAsyncComponent, watch } from 'vue'
	const DateValue = defineAsyncComponent(() => import('@components/DateValue.vue'))
	const props = defineProps({})

	const emit = defineEmits({
		changePeriodo: {
			from: Object,
			to: Object,
		}
	})

	const disabled = ref(true)
	const selected = ref('1')

	watch(selected, value => {
		disabled.value = value !== '6'
	})
	const rangeFrom = ref(new Date(2025,0,1))
	const rangeTo = ref(new Date())

	const rangeFromStr = ref('20250101')
	const rangeToStr = ref('20250219')

	const model = defineModel({
		required: false,
		default: '',
	})

	watch([rangeFromStr, rangeToStr], newValues => {
		model.value = `${newValues[0]}|${newValues[1]}`
	})

	function previousPeriodo() {
		const from = new Date(rangeFrom.value)
		const to = new Date(rangeTo.value)

		from.setMonth(from.getMonth() - 1)
		to.setMonth(to.getMonth() - 1)

		rangeFrom.value = from
		rangeTo.value = to


		emit('changePeriodo',{ from: rangeFrom.value, to: rangeTo.value })	
	}

	function nextPeriodo() {
		const from = new Date(rangeFrom.value)
		const to = new Date(rangeTo.value)

		if (to.getMonth() + 1 > new Date().getMonth() && to.getFullYear() >= new Date().getFullYear()) {
			return
		}

		from.setMonth(from.getMonth() + 1)
		to.setMonth(to.getMonth() + 1)

		rangeFrom.value = from
		rangeTo.value = to

		emit('changePeriodo',{ from: rangeFrom.value, to: rangeTo.value })	
	}
</script>

<style scoped></style>
