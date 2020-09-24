/* eslint-disable */

export default {
  state: {
    favoritesList: []
  },
  mutations: {
    ADD_FAVORITE: (state, heroId) => {
      state.favoritesList.push(heroId);
    },
    REMOVE_FAVORITE: (state, heroId) => {
      let index = state.favoritesList.indexOf(heroId);
      
      state.favoritesList.splice(index, 1);
    }
  },
  actions: {
    addFavorite({commit}, heroId) {
      commit('ADD_FAVORITE', heroId);
    },
    removeFavorite({commit}, heroId) {
      commit('REMOVE_FAVORITE', heroId);
    }
  }
};
