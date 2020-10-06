/* eslint-disable */

export default {
  namespaced: true,
  state: {
    favoritesList: []
  },
  mutations: {
    ADD_FAVORITE: (state, heroID) => {
      state.favoritesList.push(heroID);
    },
    REMOVE_FAVORITE: (state, heroID) => {
      let index = state.favoritesList.indexOf(heroID);
      
      state.favoritesList.splice(index, 1);
    }
  },
  actions: {
    removeFavorite({commit}, heroID) {
      commit('REMOVE_FAVORITE', heroID);
    },
    switchFavorite({commit, state}, heroID) {
      state.favoritesList.includes(heroID) ? commit('REMOVE_FAVORITE', heroID) : commit('ADD_FAVORITE', heroID);
    }
  },
  getters: {
    favorites(state, getters, rootState) {
      return rootState.heroes.heroesList.filter(function (hero) {
        return state.favoritesList.indexOf(hero.id) !== -1;
      });
    }
  }
};
