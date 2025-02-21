/**
 * 	Determina si el usuario posee los roles necesarios para acceder a la ruta o el recurso solicitado
 *  Authorization de las rutas:
 *
 *  	'?' 					- No necesita estar autenticado. No posee roles -anónimo-
 *  	'*'						- Necesita estar autenticado pero no necesita un rol en particular (num. roles > 0)
 *  	'['admin','editor',..]	- Necesita estar autenticado y un rol concreto
 *
 * @param {string,array} userRoles Roles asignados al usuario
 * @param {string,array} rolesAllowed Roles permitidos para acceder al recurso
 * @returns boolean
 */

export const rolesTypes = Object.freeze({
	rol_Anonymous: '?',
	rol_Authenticated: '*',
	rol_Administrador: 'administrador',
	rol_Vendedor: 'vendedor',
	rol_Comprador: 'comprador',
})

export const isUserAuthorized = (userRoles, rolesAllowed) => {
	const arrRolesUsuario = normaliceParam(userRoles)
	const arrRolesAutorizados = normaliceParam(rolesAllowed)

	if (arrRolesAutorizados.includes(rolesTypes.rol_Anonymous)) return true
	
	if (arrRolesAutorizados.includes(rolesTypes.rol_Authenticated) && arrRolesUsuario.length > 0) return true

	//return arrRolesAutorizados.some(r => arrRolesUsuario.includes(r) || arrRolesUsuario.includes(rolesTypes.rol_Administrador))
	return arrRolesAutorizados.some(r => arrRolesUsuario.includes(r))
}

/**
 *
 * @param {string,array} roles
 * @returns {Array}
 */
// const normaliceParam = param => {
// 	if (!param) return []

// 	return Array.isArray(param) ? param : param.split(',')
// }

const normaliceParam = e => (Array.isArray(e) ? e : typeof e === 'string' ? e.split(',') : [])