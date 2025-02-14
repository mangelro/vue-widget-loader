<template>
	<header>
		<nav>
			<button class="circle transparent" @click="showDialog('#dialog-employees')">
				<i>menu</i>
			</button>
			<h5 class="max center-align">Servicios</h5>
			<button class="circle transparent">
				<img class="responsive" src="/vite.svg" />
			</button>
		</nav>
	</header>
	<dialog class="left" id="dialog-employees">
		<header class="fixed">
			<nav>
				<img class="circle" src="/vite.svg" />
				<div class="max"><h6>Empleados</h6></div>
				<button class="transparent circle" @click="refreshDialog()"><i>refresh</i></button>
				<button class="transparent circle" @click="closeDialog('#dialog-employees')"><i>close</i></button>
			</nav>
		</header>
		<ul class="list border no-space">
			<li>
				<router-link to="/euribor" activeClass="orange1" exactActiveClass="orange1">
					<div class="max">
						<h6 class="small">Euribor</h6>
						<div class="small-text">Datos históricos de cotización</div>
					</div>
				</router-link>
			</li>
			<li>
				<router-link to="/precios" activeClass="orange1" exactActiveClass="orange1">
					<div class="max">
						<h6 class="small">Precios</h6>
						<div class="small-text">Datos de cotización</div>
					</div>
				</router-link>
			</li>
			<li>
				<router-link to="/ipool" activeClass="orange1" exactActiveClass="orange1">
					<div class="max">
						<h6 class="small">IPool España</h6>
						<div class="small-text">Datos de cotización</div>
					</div>
				</router-link>
			</li>
			<li>
				<router-link to="/densidad" activeClass="orange1" exactActiveClass="orange1">
					<div class="max">
						<h6 class="small">Gráf. Densidad</h6>
						<div class="small-text">Densidad de precios</div>
					</div>
				</router-link>
			</li>
			<li>
				<router-link to="/evolucion" activeClass="orange1" exactActiveClass="orange1">
					<div class="max">
						<h6 class="small">Gráf. Evolución</h6>
						<div class="small-text">Evolución de precios</div>
					</div>
				</router-link>
			</li>
		</ul>
	</dialog>

	<router-view></router-view>
</template>

<script setup>
	function showDialog(selector) {
		ui(selector)
	}

	function closeDialog(selector) {
		ui(selector)
	}

	async function refreshDialog() {}
</script>
