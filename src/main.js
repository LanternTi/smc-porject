import { createApp } from 'vue'
import './style.css'
import { router } from 'route/routes'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

const pinia = createPinia()
const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
function useTable(app) {
    app.use(VXETable)
}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(useTable).use(pinia).mount('#app')