/**
 * 	authorization de las rutas
 *
 *  '?' 	- No necesita estar autenticado. No posee roles -anónimo-
 * 	'*'		- Necesita estar autenticado pero no necesita un rol en particular (num. roles > 0)
 * 	['admin','editor',..]	- Necesita estar autenticado y un rol concreto
 *
 */
export const MainMenu = [
	{
		id: 1,
		icon: 'home',
		title: 'Home',
		caption: 'Página de inicio',
		to: '/pool',
		allowed: ['?'],
	},
	{
		id: 2,
		icon: 'contract',
		title: 'Operaciones',
		caption: 'Operaciones registradas',
		to: '/pool/operaciones',
		allowed: 'comprador,vendedor,administrador',
		submenu: [],
	},
	{
		id: 3,
		icon: 'nutrition',
		title: 'Producciones  Regulaciones',
		caption: 'Producciones/Regularizacionnes registradas',
		to: '/pool/producciones',
		allowed: 'comprador,vendedor,administrador',
		submenu: [],
	},
	{
		id: 4,
		icon: 'link',
		title: 'Conexiones',
		caption: 'Contol de conexiones',
		to: '/pool/conexiones',
		allowed: 'administrador',
		submenu: [],
	},
	{
		id: 5,
		icon: 'link',
		title: 'Conexiones',
		caption: 'Conexiones',
		to: '/pool/conexiones',
		allowed: 'comprador,vendedor',
		submenu: [],
	},
	{
		id: 6,
		icon: 'apartment',
		title: 'Entidades',
		caption: 'Entidades POOLred',
		to: '/pool/entidades',
		allowed: 'administrador',
		submenu: [],
	},
	{
		id: 7,
		icon: 'table_chart',
		title: 'Precios',
		caption: 'Cotización entre fechas',
		to: '/pool/precios',
		allowed: '*',
		submenu: [],
	},
	{
		id: 8,
		icon: 'category',
		title: 'Existencias',
		caption: 'Existencias registradas',
		to: '/pool/existencias',
		allowed: 'comprador,vendedor,administrador',
		submenu: [],
	},
	{
		id: 9,
		icon: 'show_chart',
		title: 'Gráficos',
		caption: 'Gráficos de operaciones',
		to: '/pool/graficos',
		allowed: 'comprador,vendedor,administrador',
		submenu: [
			{
				id: 91,
				icon: 'euro',
				title: 'Euribor',
				caption: 'Datos históricos de cotización',
				to: '/euribor',
				allowed: 'administrador',
				submenu: [],
			},
		
			
			{
				id: 92,
				icon: 'insert_chart',
				title: 'Gráf. densidad',
				caption: 'Densidad de precios',
				to: '/densidad',
				allowed: ['*'],
				submenu: [],
			},
			{
				id: 93,
				icon: 'monitoring',
				title: 'Gráf. evolución',
				caption: 'Evolución de precios',
				to: '/evolucion',
				allowed: '*',
				submenu: [],
			},
			{
				id: 94,
				icon: 'monitoring',
				title: 'Gráf escala fija',
				caption: 'Evolución escala fija',
				to: '/escalafija',
				allowed: '?',
				submenu: [],
			},
		],
	},
	{
		id: 10,
		icon: 'insert_chart',
		title: 'Índices POOLred',
		caption: 'Índices POOLred',
		//to: '/operaciones',
		allowed: 'comprador,vendedor,administrador',
		submenu: [{
			id: 101,
			icon: 'insert_chart',
			title: 'iPOOL España',
			caption: 'Datos de cotización',
			to: '/ipool',
			allowed: '*',
			submenu: [],
		}],
	},
	{
		id: 11,
		icon: 'badge',
		title: 'Mis datos',
		caption: 'Mis datos',
		to: '/pool/misdatos',
		allowed: 'comprador,vendedor',
		submenu: [],
	},
	{
		id: 12,
		icon: 'payments',
		title: 'Informes contado',
		caption: 'Informes contado',
		//to: '/contado',
		allowed: 'comprador,vendedor,administrador',
		submenu: [
			{
				id: 10,
				icon: 'payments',
				title: 'Contado España',
				caption: 'Informes contado de España',
				to: '/contado',
				allowed: 'comprador,vendedor,administrador',
				submenu: [],
			},
			{
				id: 10,
				icon: 'payments',
				title: 'Contado Jaén',
				caption: 'Informes contado de Jaén',
				to: '/contado',
				allowed: 'comprador,vendedor,administrador',
				submenu: [],
			},
			{
				id: 10,
				icon: 'payments',
				title: 'Contado Córdoba',
				caption: 'Informes contado de Córdoba',
				to: '/contado',
				allowed: 'comprador,vendedor,administrador',
				submenu: [],
			},
			{
				id: 10,
				icon: 'payments',
				title: 'Contado Granada',
				caption: 'Informes contado de Granada',
				to: '/contado',
				allowed: 'comprador,vendedor,administrador',
				submenu: [],
			},
			{
				id: 10,
				icon: 'payments',
				title: 'Contado Sevilla',
				caption: 'Informes contado de Sevilla',
				to: '/contado',
				allowed: 'comprador,vendedor,administrador',
				submenu: [],
			},


		],
	},
	{
		id: 12,
		icon: 'settings',
		title: 'Opciones',
		caption: 'Configuración POOLred',
		to: '/pool/opciones',
		allowed: 'administrador',
		submenu: [],
	},
	
]
