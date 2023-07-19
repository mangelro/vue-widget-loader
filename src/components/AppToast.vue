<template>
	<div class="toast primary" :class="active && 'active'">
		<slot :closeToast="hideToast">{{ message }}</slot>
	</div>
</template>

<script setup>
	import { computed, watch } from 'vue'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		delay: {
			type: Number,
			default: 3_000,
		},

		message: {
			type: String,
			default: 'I´m a Toast',
		},
	})

	const emit = defineEmits(['update:modelValue'])

	const active = computed({
		get() {
			return props.modelValue
		},
		set(newValue) {
			emit('update:modelValue', newValue)
		},
	})

	watch(active, newValue => {
		if (newValue && props.delay > 0) {
			setTimeout(() => {
				active.value = false
			}, props.delay)
		}
	})

	function hideToast() {
		active.value = false
	}
</script>
