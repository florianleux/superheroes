<template>
  <div>
    <Pagination @page-update="updatePage" :page="page" :list="heroesList"></Pagination>

    <v-container fluid class="hero-list">

      <v-row>
        <HeroCard @select-hero="selectHero(hero)" v-for="hero in heroesList.slice(heroesPerPage*(page-1),heroesPerPage*(page))" :key="hero.id" :hero="hero"></HeroCard>
      </v-row>

      <heroModal :selected-hero="selectedHero" v-if="heroModal" @close-modal="heroModal = false" :hero-modal="heroModal" />

    </v-container>
  </div>
</template>

<script>
//TODO Ordre dans l'export !!
import HeroCard from '@/components/HeroCard.vue'
import HeroModal from '@/components/HeroModal.vue'
import Pagination from '@/components/Pagination.vue'

import {mapState, mapActions} from 'vuex';

export default {
  name: 'HeroesList',
  components: {
    HeroModal,
    HeroCard,
    Pagination,
  },
  data: function () {
    return {
      heroModal: false,
      selectedHero: {},
      page :1,
      heroesPerPage : process.env.VUE_APP_HEROES_PER_PAGE
    }
  },

  methods: {
    ...mapActions('heroes', [
      'updateList',
      'nextPage'
    ]),
    selectHero(hero) {

      this.selectedHero = hero;
      this.heroModal = true;
    },
    updatePage(newPage){
      console.log("UPDATE");
      console.log(newPage)
      this.page= newPage;
    }
  },
  computed: {
    ...mapState('heroes', [
      'heroesList'
    ])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hero-list {
  max-width: none;
  padding: 0 10%;
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
