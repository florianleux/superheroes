<template>
  <div>
    <Pagination
      v-if="list.length"
      :page="page"
      :list="list"
      :is-fav-page="isFavPage"
      :card-display="cardDisplay"
      @page-update="updatePage"
      @toggle-display="toggleDisplay"
    />
    <v-container
      v-if="list.length"
      fluid
      class="hero-list"
      :class="{'hero-list--card-display': cardDisplay}"
    >
      <v-btn
        class="btn hero-list__btn--create-hero"
        fab
        fixed
        small
        elevation="2"
        @click="createModal = true;"
      >
        <v-icon
          color="grey darken-1"
        >
          fa-plus
        </v-icon>
      </v-btn>
      <v-row
        v-if="cardDisplay"
        dense
      >
        <HeroCard
          v-for="hero in list.slice(heroesPerPage * (page - 1),heroesPerPage * (page))"
          :key="hero.id"
          :hero="hero"
          @select-hero="selectHero(hero)"
        />
      </v-row>
      <HeroTable
        v-else
        :list="list"
        :page="page"
        @select-hero="selectHero"
      />
      <HeroModal
        v-if="heroModal"
        :selected-hero="selectedHero"
        :hero-modal="heroModal"
        @close-modal="heroModal = false"
        @update-hero="updateHero"
        @delete-hero="deleteHero"
        @reset-hero="updateHero"
      />
      <CreateModal
        v-if="createModal"
        :create-modal="createModal"
        @close-modal="createModal = false"
        @create-hero="createNewHero"
      />
    </v-container>
    <v-container
      v-else
      class="hero-list"
    >
      <p class="no-data-text">
        {{ noHeroText }}
      </p>
    </v-container>
  </div>
</template>
<script>
import HeroCard from '@/components/HeroCard.vue'
import HeroTable from '@/components/HeroTable.vue'
import HeroModal from '@/components/HeroModal.vue'
import CreateModal from '@/components/CreateModal.vue'
import Pagination from '@/components/Pagination.vue'

import {mapState, mapActions, mapGetters} from 'vuex';

export default {
  name: 'HeroesList',
  components: {
    HeroModal,
    HeroCard,
    HeroTable,
    CreateModal,
    Pagination,
  },
  props: {
    isFavPage: {type: Boolean, default: false},
    defaultPage: {type: Number, default: 1}
  },
  data: function () {
    return {
      heroModal: false,
      createModal: false,
      selectedHero: {},
      page: 1,
      cardDisplay: true,
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
    },
    title: function () {
      return this.isFavPage ? this.$t("GENERAL.FAVORITES_TITLE") : this.$t("GENERAL.HEROES_TITLE")
    }
  },
  watch: {
    '$route'() {
      this.page = 1;
      document.title = this.title;
    }
  },
  created() {
    document.title = this.title;
  },
  methods: {
    ...mapActions('heroes', [
      'updateList',
      'nextPage',
      'updateHero',
      'resetHero',
      'createHero',
      'deleteHero',
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
    createNewHero(hero) {
      this.createHero({newHero: hero, heroIndex: (this.page - 1) * this.heroesPerPage});
    },
    updatePage(newPage) {
      this.page = newPage;
    },
    toggleDisplay() {
      this.cardDisplay = !this.cardDisplay;
    }
  }
}
</script>
