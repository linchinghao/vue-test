import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App'
import VueCorppa from 'vue-croppa'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueCorppa)

const router = new VueRouter({
  routes: routes()
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
