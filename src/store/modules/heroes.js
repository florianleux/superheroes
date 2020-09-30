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
    ADD_NEXT_PAGE: (state, nextPage) => {
      state.heroesList = state.heroesList.concat(nextPage);
    },
    UPDATE_HERO: (state, payload) => {
      Object.assign(state.heroesList[payload.heroIndex], cloneDeep(payload.newHero));
    },
    BUFFER_HERO: (state, payload) => {
      state.heroesList[payload.heroIndex].initialValue = cloneDeep(state.heroesList[payload.heroIndex]);
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
      commit('UPDATE_LIST', list);
    }
    ,
    addNextPage({commit}, nextPage) {
      commit('ADD_NEXT_PAGE', nextPage);
    }
    ,
    updateHero({commit, state}, newHero) {
      let heroIndex = state.heroesList.indexOf(state.heroesList.find(hero => hero.id == newHero.id));
      commit('UPDATE_HERO',
        {
          'heroIndex': heroIndex,
          'newHero': newHero
        });
    },
    bufferHero({commit, state}, heroId) {
      let heroIndex = state.heroesList.indexOf(state.heroesList.find(hero => hero.id == heroId));
    
      if (!state.heroesList[heroIndex].initialValue) {
        commit('BUFFER_HERO',
          {
            'heroIndex': heroIndex
          });
      }
    },
    deleteHero({commit, state}, heroId) {
      let heroIndex = state.heroesList.indexOf(state.heroesList.find(hero => hero.id == heroId));
    
      commit('DELETE_HERO', heroIndex);
    },
    createHero({commit}, params) {
      console.log("heroindex", params.heroIndex)
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
  ,
  getters: {
    favorites(state, getters, rootState) {
      return state.heroesList.filter(function (hero) {
        return rootState.favorites.favoritesList.indexOf(hero.id) !== -1;
      });
    }
  }
}
;
