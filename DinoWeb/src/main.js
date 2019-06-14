import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './plugins/element.js'
import base from '@/views/js/base'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(base)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
