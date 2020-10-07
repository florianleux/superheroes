import Vue from 'vue'
import VueRouter from 'vue-router'
import List from "../views/List"
import NotFound from "../components/NotFound"
import i18n from "@/i18n";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/heroes'
  },
  {
    path: '/heroes',
    name: 'heroes',
    component: List,
    icon: 'fa-mask',
    props: {
      favicon: process.env.BASE_URL + 'favicon.ico',
      isFavPage: false,
      title: i18n.t("GENERAL.HEROES_TITLE")
    }
  },
  {
    path: '/favs',
    name: 'favs',
    component: List,
    icon: 'fa-heart',
    
    props: {
      favicon: 'https://www.iconarchive.com/download/i66645/designbolts/free-valentine-heart/Heart.ico',
      isFavPage: true,
      title: i18n.t("GENERAL.FAVORITES_TITLE")
    }
  },
  {
    path: '*',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes
})

export default router
