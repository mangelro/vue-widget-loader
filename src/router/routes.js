export const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/layouts/MainLayout.vue'),
		children: [
			{
				path: '/',
				name: 'index',
				component: () => import('@/pages/Index.vue'),
			},
			{
				path: '/euribor',
				name: 'euribor',
				component: () => import('@/pages/Euribor.vue'),
			},
			{
				path: '/precios',
				name: 'precios',
				component: () => import('@/pages/Precios.vue'),
			},
			{
				path: '/ipool',
				name: 'ipool',
				component: () => import('@/pages/IPool.vue'),
			},
			{
				path: '/densidad',
				name: 'densidad',
				component: () => import('@/pages/Densidad.vue'),
			},
			{
				path: '/evolucion',
				name: 'evolucion',
				component: () => import('@/pages/Evolucion.vue'),
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('@/pages/NotFound.vue'),
		meta: { allowed: '?' },
	},
]
