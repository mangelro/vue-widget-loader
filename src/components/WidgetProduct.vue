<template>
	<article class="border small">
		<div class="img-hover-zoom center-align">
			<img class="responsive" :src="data.thumbnail" :alt="data.title"  />
		</div>
		<h5>{{ data.title }}</h5>

		<a class="chip small no-clickable">
			<span>{{ data.category }}</span>
		</a>
	
		<a class="chip small">
			<span>{{ data.brand }}</span>
		</a>
	
		<p>{{ data.description }}</p>
		<p>{{ data.price }}€</p>
		<nav class="right-align">
			<button @click="buyIt($event)">Buy</button>
		</nav>
	</article>
</template>

<script setup>
	//name:'WidgetResult',

	//const TheComponent = defineAsyncComponent(() => import('src/components/TheComponent.vue'))

	const props = defineProps({
		data: {
			type: Object,
			requited: true,
		},
	})

	const buyIt = (e) => {
		console.log('buyIt', e.target)	
	}
</script>

<style scoped>
	article {
		height: 100%;
	}

	article > p {
		min-height: 57px;
	}

	.img-hover-zoom {
		overflow: hidden; /* [1.2] Hide the overflowing of child elements */
	}

	/* [2] Transition property for smooth transformation of images */
	.img-hover-zoom img {
		object-fit: cover;

		filter: grayscale(50%);
		transition: transform 1s, filter 1s ease-in-out;
		/* transition: transform 0.5s ease; */
	}

	/* [3] Finally, transforming the image when container gets hovered */
	.img-hover-zoom:hover img {
		transform: scale(1.1);
		filter: grayscale(0);
	}
</style>
