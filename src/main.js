import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

//VueX initialisation
const store = new Vuex.Store({
 state : {
   heroesList: {
     total:0,
     results:[]
   },
   selectedHero: {},
     favorites :{}
 },
  mutations: {
    updateList(state, list) {
      this.state.heroesList = list;
      console.log( this.state.heroesList);
    },
    nextPage(state, nextPage){
      console.log("nxt");
      console.log(nextPage);
      this.state.heroesList.results = this.state.heroesList.results.concat(nextPage);
console.log( this.state.heroesList); },
    selectHero(state,hero) {
      this.state.selectedHero = hero;
    },
      addFav(state,hero){
        this.state.favorites[hero.id] = hero;
      },
      removeFav(state,hero){
        delete(this.state.favorites[hero.id]);
      }
  }
});



new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
