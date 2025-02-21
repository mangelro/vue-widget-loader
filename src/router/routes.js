export const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/layouts/MainLayout.vue'),
		children: [
			{
				path: '/',
				name: 'index',
				component: () => import('@/pages/Home.vue'),
				meta: { allowed: '?' },
			},
			{
				path: '/login',
				name: 'login',
				component: () => import('@/pages/Login.vue'),
				meta: { allowed: '?' },
				//De esta form se hace más evidente el id necesario en el componente
				props: router => {
					return {
						returnUrl: decodeURIComponent(router.query.returnUrl || '/pool'),
					}
				},
			},
		],
	},
	{
		path: '/',
		name: 'pool',
		component: () => import('@/layouts/MiembroLayout.vue'),
		children: [
			{
				path: '/pool/',
				name: 'main',
				component: () => import('@/pages/Index.vue'),
				meta: { allowed: '*' },
			},
			{
				path: '/pool/euribor',
				name: 'euribor',
				component: () => import('@/pages/Euribor.vue'),
				meta: { allowed: 'administrador' },
			},
			{
				path: '/pool/euribor',
				name: 'euribor',
				component: () => import('@/pages/Euribor.vue'),
				meta: { allowed: 'administrador' },
			},
			{
				path: '/pool/precios',
				name: 'precios',
				component: () => import('@/pages/Precios.vue'),
				meta: { allowed: '*' },
			},
			{
				path: '/pool/ipool',
				name: 'ipool',
				component: () => import('@/pages/IPool.vue'),
				meta: { allowed: '*' },
			},
			{
				path: '/pool/densidad',
				name: 'densidad',
				component: () => import('@/pages/Densidad.vue'),
				meta: { allowed: '*' },
			},
			{
				path: '/pool/evolucion',
				name: 'evolucion',
				component: () => import('@/pages/Evolucion.vue'),
				meta: { allowed: '*' },
			},
			{
				path: '/pool/escalafija',
				name: 'escalafija',
				component: () => import('@/pages/EscalaFija.vue'),
				meta: { allowed: '*' },
			},
			{
				path: '/pool/operaciones',
				name: 'operaciones',
				component: () => import('@/pages/Operaciones.vue'),
				meta: { allowed: 'vendedor,comprador,administrador' },
			},

			// Always leave this as last one,
			// but you can also remove it
			{
				path: '/:catchAll(.*)*',
				component: () => import('@/pages/NotFound.vue'),
				meta: { allowed: '?' },
			},
		],
	},
]
