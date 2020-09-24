/* eslint-disable */

export default {
  state: {
    heroesList: [],
    selectedHeroId: 0
  },
  mutations: {
    UPDATE_LIST: (state, list) => {
      state.heroesList = list;
    },
    NEXT_PAGE: (state, nextPage) => {
      state.heroesList = state.heroesList.concat(nextPage);
    },
    SELECT_HERO: (state, heroId) => {
      state.selectedHeroId = heroId;
    }
  },
  actions: {
    updateList({commit}, list) {
      commit('UPDATE_LIST', list);
    },
    nextPage({commit}, nextPage) {
      commit('NEXT_PAGE', nextPage);
    },
    selectHero({commit}, heroId) {
      commit('SELECT_HERO', heroId);
    }
  }
};
