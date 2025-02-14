import { createApp } from 'vue'
import './css/style.css'
import App from './App.vue'

// Importa el router
import router from './router/index'

//eCharts
import { registerTheme } from 'echarts/core';
import themeMinimal from '/src/css/themes/minimalist.json'
import themeDash from '/src/css/themes/dashboard.json'


registerTheme('minimalist', themeMinimal);
registerTheme('dashboard', themeDash);


import 'beercss'

createApp(App)
.use(router)
.mount('#app')

