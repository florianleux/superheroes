import Vue from 'vue'
import VueRouter from 'vue-router'
import HeroesList from "../views/HeroesList";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: HeroesList
  }
]

const router = new VueRouter({
  routes
})

export default router
