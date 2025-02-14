<template>
	<article class="medium middle-align center-align">
		<div class="card">
			<div class="card-header">
				<h5>Login</h5>
			</div>
			<div class="card-content">
				<div class="field border">
					<input id="username" type="text" placeholder="Enter your username" required/>
				</div>
				<div class="field border">
					<input id="password" type="password" placeholder="Enter your password" required/>

        </div>
			</div>
			<div class="card-footer">
				<button class=" primary">Login</button>
			</div>
		</div>
	</article>
</template>

<script setup>
	//name:'Index',
	import { ref, defineAsyncComponent } from 'vue'

	//const TheComponent = defineAsyncComponent(() => import('src/components/TheComponent.vue'))

	const props = defineProps({})
</script>
<style scoped>
	.card {
		width: 100%;
		max-width: 400px;
		padding: 20px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		background-color: #fff;
		transition: box-shadow 0.3s ease;
	}

	.card:hover {
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}

	.card-header {
		margin-bottom: 20px;
		text-align: center;
	}


	.card-footer {
		text-align: center;
	}

	.card-footer .large {
		width: 100%;
		padding: 10px;
		border-radius: 8px;
	}
</style>
