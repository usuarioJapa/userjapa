import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Tailwind
import './assets/style/tailwind.css'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {
  faTelegram,
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon  } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

// Setting Font Awesome
library.add(
  faEnvelope,
  faTelegram,
  faLinkedin,
  faGithub
)

Vue.component('fa-icon', FontAwesomeIcon)

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
