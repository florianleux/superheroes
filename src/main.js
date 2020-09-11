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

    heroesList: [],
    selectedHero: {},

  mutations: {
    updateList(state, list) {
      this.heroesList = list;
    }
  }
});

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
