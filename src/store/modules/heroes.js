/* eslint-disable */
import cloneDeep from 'lodash.clonedeep';

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
      Object.assign(state.heroesList[payload.heroIndex],cloneDeep(payload.newHero));
    },
    BUFFER_HERO: (state, payload) => {
      state.heroesList[payload.heroIndex].initialValue = cloneDeep(state.heroesList[payload.heroIndex]);
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
    },
    bufferHero({commit,state},heroId){
      let heroIndex = state.heroesList.indexOf(state.heroesList.find(hero => hero.id == heroId));
      
      if(!state.heroesList[heroIndex].initialValue){
        commit('BUFFER_HERO',
          {
            'heroIndex': heroIndex
          });
      }
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
