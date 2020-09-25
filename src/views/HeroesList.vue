<template>
  <v-container fluid class="hero-list">
    <v-row>
      <HeroCard @click.native.stop="selectHero(hero)" v-for="hero in heroesList.slice(24*(page-1),24*(page))" :key="hero.id" :hero="hero" ></HeroCard>
    </v-row>

    <v-row>
      <div class="pagination">

        <a href="#" @click.stop="previousPage" v-if="page>1" class="link previous-page"><i class="fas fa-angle-left"></i></a>
        <a href="#" @click.stop="nextPage" class="link next-page"><i class="fas fa-angle-right"></i></a>
      </div>
    </v-row>

    <heroModal :selected-hero="selectedHero" @close-modal="heroModal = false" :hero-modal="heroModal" />

  </v-container>
</template>

<script>
//TODO Ordre dans l'export !!
import HeroCard from '@/components/HeroCard.vue'
import HeroModal from '@/components/HeroModal.vue'
import {mapState, mapActions} from 'vuex';

export default {
  name: 'HeroesList',
  components: {
    HeroModal,
    HeroCard
  },
  data: function () {
    return {
      heroModal: false,
      page: 1,
      selectedHero : {}
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
    previousPage() {
      this.page--;
    },
    nextPage() {
      this.page++;
      if (this.heroesList.results.length < 24 * this.page) {
        this.$axios.get(process.env.VUE_APP_API_URL
            + "/v1/public/characters?apikey="
            + process.env.VUE_APP_API_PUBLIC_KEY
            + "&limit=" + process.env.VUE_APP_API_LIMIT + "&offset=" + process.env.VUE_APP_API_LIMIT * (this.page - 1)
        ).then(response => {
          //TODO Remplacer par une action
          this.$store.commit('nextPage', response.data.data.results);
        });
      }
    },
  },
  computed: {
    ...mapState('heroes', [
      'heroesList'
    ])
  },
}
</script>

<style lang="scss" scoped>
.hero-list {
  max-width: none;
  padding: 0 10%;
}

.pagination {
  .link {
    position: fixed;
    top: 50%;
    margin-top: -    1em;
    font-size: 4em;
    color: #5A5A5A52;

    &.next-page {
      right: 50px;
    }

    &.previous-page {
      left: 50px;
    }

    &:hover {
      color: #5A5A5A;
    }
  }
}
</style>
