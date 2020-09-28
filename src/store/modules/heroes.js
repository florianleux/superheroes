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
    ADD_NEXT_PAGE: (state, nextPage) => {
      state.heroesList = state.heroesList.concat(nextPage);
    },
    UPDATE_HERO: (state, payload) => {
      Object.assign(state.heroesList[payload.heroIndex], payload.newHero);
    }
  },
  actions: {
    updateList({commit}, list) {
      commit('UPDATE_LIST', list);
    },
    addNextPage({commit}, nextPage) {
      commit('ADD_NEXT_PAGE', nextPage);
    },
    updateHero({commit, state}, newHero) {
      let heroIndex = state.heroesList.indexOf(state.heroesList.find(hero => hero.id == newHero.id));
      commit('UPDATE_HERO',
        {
          'heroIndex': heroIndex,
          'newHero': newHero
        });
    }
  },
  getters: {
    favorites(state, getters, rootState) {
      return state.heroesList.filter(function (hero) {
        return rootState.favorites.favoritesList.indexOf(hero.id) !== -1;
      });
    }
  }
};
