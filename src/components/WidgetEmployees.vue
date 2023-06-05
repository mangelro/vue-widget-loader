<template>
	<div
		class="row round clickable tiny-padding"
		v-for="employee in data.data"
		:key="employee.id"
		@click="onClick"
		title="see details"
	>
		<img class="circle tiny online" :src="employee.profile_image || 'https://www.beercss.com/beer-and-woman.jpg'" />
		<div class="max">
			<h6>{{ employee.employee_name }}</h6>
			<div>{{ employee.employee_salary }}</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		data: {
			type: Object,
			requited: true,
		},
	})

	function onClick(e) {
		console.log('click employee ', e)
	}
</script>

<style scoped>

</style>
