import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import { rolesTypes } from '@/utiles/RolesUsuario'

export const useAuthStore = defineStore(
	'auth',
	() => {
		const userAuth = ref(null)

		function logout() {
			userAuth.value = null
		}

		const isAdm = computed(() => userAuth.value?.roles.includes(rolesTypes.rol_Administrador) ?? false)

		return {
			userAuth,

			//getters
			isAdm,

			// actions
			logout,
		}
	},
	{
		persist: {
			storage: sessionStorage,
		},
	}
)
