import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import heroesModule from './modules/heroes'
import favoritesModule from './modules/favorites'

Vue.use(Vuex)
Vue.prototype.$axios = axios;

export default new Vuex.store({
  modules: {
    heroes: heroesModule,
    favorites: favoritesModule
  },
  state: {}
});
