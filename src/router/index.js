import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home              = () => import(/* webpackChunkName: "home"               */ '../views/Home.vue'),
      LightningDistance = () => import(/* webpackChunkName: "lightning-distance" */ '../views/LightningDistance.vue'),
      TensorFlow        = () => import(/* webpackChunkName: "tensor-flow"        */ '../views/TensorFlow.vue'),
      NotFound          = () => import(/* webpackChunkName: "not-found"          */ '../views/404.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lightning-distance',
    name: 'LightningDistance',
    component: LightningDistance,
    meta: {
      title: 'Lightning Distance Calculator'
    }
  },
  {
    path: '/tensor-flow',
    name: 'TensorFlow',
    component: TensorFlow,
    meta: {
      title: 'Tensor Flow'
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
    meta: {
      title: 'Not Found!'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
