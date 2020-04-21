import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Tailwind
import './assets/style/tailwind.css'

Vue.config.productionTip = false

const titleDefault = document.title

router.beforeEach((to, from, next) => {
  // Set Meta Title
  if (to.meta && to.meta.title) {
    if (document.title != to.meta.title)
      document.title = to.meta.title
  } else {
    if (document.title != titleDefault)
      document.title = titleDefault
  }

  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
