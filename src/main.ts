import 'element-plus/dist/index.css'
import '@/assets/public/public.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import elementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

import router from './router'
import 'normalize.css/normalize.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(elementPlus)

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
