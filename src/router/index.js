import Vue from 'vue'
import VueRouter from 'vue-router'
// import HeroesList from "../views/HeroesList";
// import FavsList from "../views/FavsList";
import List from "../views/List"

Vue.use(VueRouter)

const routes = [
  {
    path: '/heroes',
    name: 'heroes',
    component: List,
    props: {
      isFavPage: false,
      defaultPage: 1
    },
  },
  {
    path: '/favs',
    name: 'favs',
    component: List,
    props: {
      isFavPage: true,
      defaultPage: 1
    },
  }
]

const router = new VueRouter({
  routes
})

export default router
