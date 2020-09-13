import Vue from 'vue'
import VueRouter from 'vue-router'
import HeroesList from "../views/HeroesList";
import FavsList from "../views/FavsList";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/heroes',
    name: 'heroes',
    component: HeroesList
  },
    {
      path: '/favs',
      name: 'favs',
      component: FavsList
    }
]

const router = new VueRouter({
  routes
})

export default router
