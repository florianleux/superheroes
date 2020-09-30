<template>
  <div>
    <Pagination
        @page-update="updatePage"
        @toggle-display="toggleDisplay"
        :page="page"
        :list="list"
        :is-fav-page="isFavPage"
        :card-display="cardDisplay"
    ></Pagination>
    <v-container
        fluid
        class="hero-list"
        :class="{'card-display' : cardDisplay}"
        v-if="list.length >0"
    >
      <v-row
          v-if="cardDisplay"
      >
        <HeroCard
            @select-hero="selectHero(hero)"
            v-for="hero in list.slice(heroesPerPage*(page-1),heroesPerPage*(page))"
            :key="hero.id"
            :hero="hero"
        />
      </v-row>
      <HeroTable
          v-else
          :list="list"
          :page="page"
          @select-hero="selectHero"
      />
      <heroModal
          :selected-hero="selectedHero"
          v-if="heroModal"
          @close-modal="heroModal = false"
          :hero-modal="heroModal"
          @update-hero="updateHero"
          @reset-hero="updateHero"
      />
    </v-container>
    <v-container
        v-else
        class="hero-list"
    >
      <p class="no-data-text">{{ noHeroText }}</p>
    </v-container>
  </div>
</template>
<script>
//TODO Ordre dans l'export !!
import HeroCard from '@/components/HeroCard.vue'
import HeroTable from '@/components/HeroTable.vue'
import HeroModal from '@/components/HeroModal.vue'
import Pagination from '@/components/Pagination.vue'

import {mapState, mapActions, mapGetters} from 'vuex';

export default {
  name: 'HeroesList',
  components: {
    HeroModal,
    HeroCard,
    HeroTable,
    Pagination,
  },
  watch: {
    '$route'() {
      this.page = 1;
    }
  },
  data: function () {
    return {
      heroModal: false,
      selectedHero: {},
      page: 1,
      cardDisplay: true,
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
    toggleDisplay() {
      this.cardDisplay = !this.cardDisplay;
    }
  },
  computed: {
    ...mapState('heroes', [
      'heroesList',
        'heroesPerPage',
    ]),
    ...mapState('favorites', [
      'favoritesList'
    ]),
    list: function () {
      if (this.isFavPage) {
        return this.favorites(this.favoritesList);
      } else {
        return this.heroesList
      }
    },
    noHeroText: function () {
      if (this.isFavPage) {
        return this.$t("LIST.NO_FAVORITES");
      } else {
        return this.$t("LIST.NO_HERO");
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
  bottom: 110px;
  top: 100px;
  overflow: hidden;

  &.card-display {
    overflow-y: scroll;
  }
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

.no-data-text {
  color: black;
  display: block;
  margin: 50% auto;
  text-align: center;
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
