<template>
  <div>
    <Pagination
        @page-update="updatePage"
        :page="page"
        :list="list"
        :is-fav-page="isFavPage"
    ></Pagination>
    <v-container
        fluid
        class="hero-list"
    >
      <v-row>
        <HeroCard
            @select-hero="selectHero(hero)"
            v-for="hero in list.slice(heroesPerPage*(page-1),heroesPerPage*(page))"
            :key="hero.id"
            :hero="hero"
        ></HeroCard>
      </v-row>
      <heroModal
          :selected-hero="selectedHero"
          v-if="heroModal"
          @close-modal="heroModal = false"
          :hero-modal="heroModal"
          @update-hero="updateHero"
          @reset-hero="updateHero"
      />
    </v-container>
  </div>
</template>
<script>
//TODO Ordre dans l'export !!
import HeroCard from '@/components/HeroCard.vue'
import HeroModal from '@/components/HeroModal.vue'
import Pagination from '@/components/Pagination.vue'

import {mapState, mapActions, mapGetters} from 'vuex';

export default {
  name: 'HeroesList',
  components: {
    HeroModal,
    HeroCard,
    Pagination,
  },
  watch: {
    '$route' () {
      this.page = 1;
    }
  },
  data: function () {
    return {
      heroModal: false,
      selectedHero: {},
      page:1,
      heroesPerPage: process.env.VUE_APP_HEROES_PER_PAGE
    }
  },
  props: {
    isFavPage: {type: Boolean, default: false},
    defaultPage: {type: Number, default: 1}
  },
  methods: {
    ...mapActions('heroes', [
      'updateList',
      'nextPage',
      'updateHero',
      'resetHero',
      'bufferHero'
    ]),
    ...mapGetters('heroes', [
      'favorites'
    ]),
    selectHero(hero) {
      this.selectedHero = hero;
      this.heroModal = true;
      if (!hero.buffered) {
        this.bufferHero(hero.id)
      }
    },
    updatePage(newPage) {
      this.page = newPage;
    },
  },
  computed: {
    ...mapState('heroes', [
      'heroesList'
    ]),
    ...mapState('favorites', [
      'favoritesList'
    ]),
    list: function(){
      if(this.isFavPage){
        return this.favorites(this.favoritesList);
      }else{
        return this.heroesList
      }
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style
    lang="scss"
    scoped
>
.hero-list {
  max-width: none;
  padding: 0 100px;
  position: fixed;
  bottom: 50px;
  top: 130px;
  overflow-y: scroll;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
