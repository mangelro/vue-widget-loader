import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '@stores/AuthStore'
import { isUserAuthorized } from '../utiles/RolesUsuario'

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, _, next) => {
	const store = useAuthStore()

	const urlAutorizacion = to.meta.allowed || '*'

	if (to.name !== 'login') {
		if (!isUserAuthorized(store.userAuth?.roles ?? [], urlAutorizacion)) {
			// //Solo en el caso de poseer roles y no estar autorizado para esos roles
			// if (store.userAuth.roles.length > 0) {
			// 	Notify.create({
			// 		type: 'negative',
			// 		message: t('global.areaNotAllowed'),
			// 		attrs: {
			// 			role: 'alertdialog',
			// 		},
			// 	})
			// }
			next({ name: 'login', query: { returnUrl: encodeURIComponent(to.fullPath) } })
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
