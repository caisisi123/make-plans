import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './assets/main.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 ,locale:zhCn})
app.mount('#app')
