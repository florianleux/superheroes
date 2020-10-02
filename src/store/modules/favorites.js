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
    addFavorite({commit}, heroID) {
      commit('ADD_FAVORITE', heroID);
    },
    removeFavorite({commit}, heroID) {
      commit('REMOVE_FAVORITE', heroID);
    },
    switchFavorite({commit, state}, heroID) {
      state.favoritesList.includes(heroID) ? commit('REMOVE_FAVORITE', heroID) : commit('ADD_FAVORITE', heroID);
    }
  },
};
