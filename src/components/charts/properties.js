export const commomProperties = Object.freeze({
	data: {
		type: Array,
		default: [],
	},
	title: {
		type: String,
		default: '',
	},
	theme: {
		type: String,
		default: 'light',
	},
	seriesColor: [String,Array],
	seriesName: [String,Array],
})
