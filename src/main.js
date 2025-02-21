import { createApp } from 'vue'

import App from './App.vue'

// Importa el router '@/router/index'
import router from '@/router'

//eCharts
import { registerTheme } from 'echarts/core'
import themeMinimal from '/src/css/themes/minimalist.json'
import themeDash from '/src/css/themes/dashboard.json'

//importmos los stores  '@stores/index'
import { pinia } from '@stores'
import { useAuthStore } from '@stores/AuthStore'

registerTheme('minimalist', themeMinimal)
registerTheme('dashboard', themeDash)

import 'beercss'
import './css/style.css'

const onFocus = e => {
	e.srcElement.select()
}

createApp(App)
	.use(pinia)
	.use(router)
	.directive('admin', {


		
		mounted: (el, _binding, vnode) => {


			const store = useAuthStore()

			if (store.userAuth && store.userAuth.isAuthenticated && !store.userAuth.roles.includes('administrador')) {
				// replace HTMLElement with comment node
				const comment = document.createComment(' -- v-admin -- ')

				Object.defineProperty(comment, 'setAttribute', {
					value: () => undefined,
				})
				vnode.elm = comment
				vnode.el = comment
				vnode.text = ' '
				vnode.isComment = true
				vnode.context = undefined
				vnode.tag = undefined

				if (el.parentNode) {
					el.parentNode.replaceChild(comment, el)
				}
			}
		},
	})
	.directive('focus', {
		mounted: el => {
			//const i = el.querySelectorAll('input[type=text],input[type=password],input[type=email]')[0]
			el?.addEventListener('focus', onFocus)
		},

		beforeUnmount: el => {
			//const i = el.querySelectorAll('input[type=text],input[type=password],input[type=email]')[0]
			el?.removeEventListener('focus', onFocus)
		},
	})
	.mount('#app')
