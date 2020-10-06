/* eslint-disable */
import cloneDeep from 'lodash.clonedeep';

export default {
  namespaced: true,
  state: {
    heroesList: [],
    heroesPerPage: 24,
  },
  mutations: {
    UPDATE_LIST: (state, list) => {
      state.heroesList = list;
    },
    UPDATE_HERO: (state, payload) => {
      //Note : Object assign is the only solution to keep the selected Hero updated when the hero is modified.
      // If you erase the object or splice the array, the selected Hero object is deleted and their infos are not updated in the modal
      Object.assign(state.heroesList[payload.heroIndex], cloneDeep(payload.newHero));
    },
    DELETE_HERO: (state, heroIndex) => {
      state.heroesList.splice(heroIndex, 1);
    },
    CREATE_HERO: (state, payload) => {
      state.heroesList.splice(payload.heroIndex, 0, payload.newHero);
    },
    UPDATE_HEROES_PER_PAGE(state, newValue) {
      state.heroesPerPage = newValue;
    }
  },
  actions: {
    updateList({commit}, list) {
      list.forEach(function (hero){
        if(!hero.buffered){
          hero.initialValue = cloneDeep(hero);
          hero.buffered = true;
        }
      })
      
      commit('UPDATE_LIST', list);
    },
    updateHero({commit, state}, newHero) {
      let heroIndex = state.heroesList.findIndex(hero => hero.id === newHero.id);
      commit('UPDATE_HERO',
        {
          'heroIndex': heroIndex,
          'newHero': newHero
        });
    },
    deleteHero({commit, state}, heroID) {
      let heroIndex = state.heroesList.findIndex(hero => hero.id === heroID);
      
      commit('DELETE_HERO', heroIndex);
    },
    createHero({commit}, params) {
      params.newHero.initialValue = cloneDeep(params.newHero)
      params.newHero.buffered = true;
      
      commit('CREATE_HERO',
        {
          'heroIndex': params.heroIndex,
          'newHero': params.newHero
        });
    },
    updateHeroesPerPage({commit}, newValue) {
      commit('UPDATE_HEROES_PER_PAGE', newValue);
    }
  }
}
;
