<template>
	<div class="grid">
		<article class="s12 m12 l6">
			<DateRange v-model="periodo"></DateRange>
			<select v-model="origen">
				<optgroup label="Paises">
					<option v-for="pais in paises" :value="pais.value">
						{{ pais.text }}
					</option>
				</optgroup>

				<optgroup label="Provincias">
					<option v-for="provincia in provincias" :value="provincia.value">
						{{ provincia.text }}
					</option>
				</optgroup>
			</select>
			<button class="btn primary small" @click="search">
				<i>search</i>
				<span>Buscar</span>
			</button>
		</article>
		<article class="s12 m12 l12">
			<div class="row">
				<i>chevron_right</i>
				<h5 class="max">Precios medios</h5>
				<button class="chip round">
					<i class="primary-text">today</i>
					<span>{{ periodo }}</span>
				</button>
			</div>
			<div>
				<table v-if="data" class="border" >
					<caption>
						Núm. total operaciones
						<b>{{ operacionesTotal }}</b>
					</caption>
					<thead>
						<tr>
							<th class="max">Calidad</th>
							<th>Cantidad (t)</th>
							<th>Precio medio (€/t)</th>
							<th>Anticipo medio (€/t)</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="{ calidad, cantidad, precioMedio, anticipoMedio } in data?.result" :key="cantidad">
							<td class="max"><button class="chip fill round" :class="calidad">{{ calidad }}</button></td>
							<td>{{ cantidad?.toFixed(2)  ?? 's/c'}}</td>
							<td>{{ precioMedio?.toFixed(2)  ?? 's/c'}}</td>
							<td>{{ anticipoMedio?.toFixed(2)  ?? 's/c'}}</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th class="max">TOTAL</th>
							<th>{{ cantidadTotal?.toFixed(2) ?? 's/c' }}</th>
							<th>{{ precioMedioTotal?.toFixed(2) ?? 's/c' }}</th>
							<th>{{ anticipoMedioTotal?.toFixed(2) ?? 's/c' }}</th>
						</tr>
					</tfoot>
				</table>

				<table v-else>
					<thead>
						<tr>
							<th class="max">Calidad</th>
							<th>Cantidad (t)</th>
							<th>Precio medio (€/t)</th>
							<th>Anticip medio (€/t)</th>
						</tr>
					</thead>

					<tfoot>
						<tr>
							<th class="max">TOTAL</th>
							<th>s/c</th>
							<th>s/c</th>
							<th>s/c</th>
						</tr>
					</tfoot>
				</table>
			</div>

			<p class="small-text">{{ data?.timestamp }}</p>
		</article>
	</div>
	<div id="errorToast" class="snackbar error">{{ error }}</div>
</template>

<script setup>
	//name:'Precios',
	import { ref, defineAsyncComponent, onMounted, watch, computed } from 'vue'
	import { service } from '@services/PreciosService'
	import { useResolver } from '@composables/Resolver.js'
	const DateRange = defineAsyncComponent(() => import('@components/DateRange.vue'))

	//const timestamp = ref('')

	const paises = ref([
		{ value: '#ES', text: 'España' },
		{ value: '#PT', text: 'Portugal' },
		{ value: '#IT', text: 'Italia' },
	])

	const provincias = ref([
		{ value: 'JAÉN', text: 'Jaén' },
		{ value: 'CÓRDOBA', text: 'Córdoba' },
		{ value: 'SEVILLA', text: 'Sevilla' },
		{ value: 'ALMERÍA', text: 'Almería' },
		{ value: 'CÁDIZ', text: 'Cádiz' },
		{ value: 'GRANADA', text: 'Granada' },
		{ value: 'HUELVA', text: 'Huelva' },
		{ value: 'MÁLAGA', text: 'Málaga' },
	])

	const { tryResolve, data, error } = useResolver({
		notifications: {
			errorNotification: e => {
				ui('#errorToast', 2000)
			},
		},
	})

	const origen = ref('#ES')

	// watch(origen, newValue => {
	// 	console.log(origen.value.startsWith('#') ? origen.value.substring(1, 3) : null)
	// })

	const periodo = ref('20250101|20250219')

	const operacionesTotal = computed(() => {
		if (data.value) {
			return data.value.result.reduce((acc, { numeroOperaciones }) => acc + numeroOperaciones, 0)
		}
		return null
	})

	const cantidadTotal = computed(() => {
		if (data.value) {
			return data.value.result.reduce((acc, { cantidad }) => acc + cantidad, 0)
		}
		return null
	})

	const precioMedioTotal = computed(() => {
		if (data.value) {
			const pm = data.value.result.reduce((acc, { cantidad, precioMedio }) => acc + cantidad * precioMedio, 0)
			return pm / cantidadTotal.value
		}
		return null
	})

	const anticipoMedioTotal = computed(() => {
		if (data.value) {
			const am = data.value.result.reduce((acc, { cantidad, anticipoMedio }) => acc + cantidad * anticipoMedio, 0)
			return am / cantidadTotal.value
		}
		return null
	})

	async function search() {
		const query = {
			periodo: periodo.value,
			origenPais: origen.value.startsWith('#') ? origen.value.substring(1, 3) : null,
			origenProvincia: !origen.value.startsWith('#') ? origen.value : null,
		}

	

		await tryResolve(() => service.getPreciosMedios(query))
	}
</script>

<style scoped></style>
