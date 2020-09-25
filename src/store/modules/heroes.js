/* eslint-disable */

export default {
  namespaced: true,
  state: {
    heroesList: []
  },
  mutations: {
    UPDATE_LIST: (state, list) => {
      state.heroesList = list;
    },
    NEXT_PAGE: (state, nextPage) => {
      state.heroesList = state.heroesList.concat(nextPage);
    }
  },
  actions: {
    updateList({commit}, list) {
      commit('UPDATE_LIST', list);
    },
    nextPage({commit}, nextPage) {
      commit('NEXT_PAGE', nextPage);
    }
  },
  getters: {
    favorites(state,getters,rootState) {
      return state.heroesList.filter(function (hero) {
        return rootState.favorites.favoritesList.indexOf(hero.id) !== -1;
      });
    }
  }
};
