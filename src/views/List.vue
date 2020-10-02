<template>
  <div>
    <Pagination
      v-if="list.length"
      :page="page"
      :list="list"
      :is-fav-page="isFavPage"
      :is-search-active="isSearchActive"
      :card-display="cardDisplay"
      @page-update="updatePage"
      @toggle-display="toggleDisplay"
    />
    <v-expand-transition>
      <v-row
        v-if="filtersActive"
        class="filters"
        no-gutters
      >
        <v-col>
          <v-text-field
            v-model="filterNameQuery"
            hide-details
            :label="$t('FILTERS.NAME')"
            clear-icon="fa-times-circle"
            clearable
            class="filters__input filters__input--name"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="filterIDQuery"
            hide-details
            reverse
            clear-icon="fa-times-circle"
            :label="$t('FILTERS.ID')"
            clearable
            class="filters__input filters__input--id"
          />
        </v-col>
      </v-row>
    </v-expand-transition>
    <div class="sidebar">
      <v-btn
        class="btn sidebar__btn sidebar__btn--filters"
        :class="{'sidebar__btn--active': filtersActive}"
        fab
        x-small
        elevation="2"
        :title="$t('FILTERS.BTN_TITLE')"
        @click="switchFilters"
      >
        <v-icon
          color="grey darken-1"
        >
          fa-filter
        </v-icon>
      </v-btn>
      <v-btn
        class="btn sidebar__btn sidebar__btn--create-hero"
        fab
        x-small
        elevation="2"
        @click="createModal = true;"
      >
        <v-badge
          color="red"
          bordered
          icon="fa-plus"
          offset-x="5"
          offset-y="9"
        >
          <v-icon
            color="grey darken-1"
          >
            fa-mask
          </v-icon>
        </v-badge>
      </v-btn>
    </div>
    <v-container
      v-if="list.length"
      fluid
      class="hero-list"
      :class="{'hero-list--card-display': cardDisplay, 'hero-list--filters-active': filtersActive}"
    >
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
        @delete-hero="deleteHeroEverywhere"
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
      :class="{'hero-list--filters-active': filtersActive}"
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
  data() {
    return {
      heroModal: false,
      createModal: false,
      selectedHero: {},
      page: 1,
      cardDisplay: true,
      filtersActive: false,
      filterNameQuery: '',
      filterIDQuery: ''
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
    list() {
      let _this = this;
      if (this.isFavPage) {
        return this.favorites(this.favoritesList);
      } else {
        let filterNameRegex = new RegExp(this.filterNameQuery, 'gmi'),
          filterIDRegex = new RegExp(this.filterIDQuery, 'gmi');

        if (this.filterNameQuery && this.filterIDQuery) {
          _this.page = 1

          return this.heroesList.filter(function (hero) {
            return (hero.name).match(filterNameRegex) !== null && (hero.id.toString()).match(filterIDRegex) !== null;
          });

        } else if (this.filterNameQuery) {
          _this.page = 1

          return this.heroesList.filter(function (hero) {
            return (hero.name).match(filterNameRegex) !== null;
          });
        } else if (this.filterIDQuery) {
          _this.page = 1

          return this.heroesList.filter(function (hero) {
            return (hero.id.toString()).match(filterIDRegex) !== null;
          });
        } else {
          return this.heroesList;
        }
      }
    },
    isSearchActive() {
      return this.filterNameQuery || this.filterIDQuery ? true : false;
    },
    noHeroText() {
      if (this.isSearchActive) {
        return this.$t("LIST.NO_FILTERS_RESULT");
      } else if (this.isFavPage) {
        return this.$t("LIST.NO_FAVORITES");
      } else {
        return this.$t("LIST.NO_HERO");
      }
    },
    title() {
      return this.isFavPage ? this.$t("GENERAL.FAVORITES_TITLE") : this.$t("GENERAL.HEROES_TITLE")
    },
    faviconURl() {
      return this.isFavPage ? 'https://www.iconarchive.com/download/i66645/designbolts/free-valentine-heart/Heart.ico' : process.env.BASE_URL + 'favicon.ico'
    }
  },
  watch: {
    '$route'() {
      let favicon = document.getElementById("favicon");

      this.page = 1;
      this.filtersActive = false;
      document.title = this.title;
      favicon.href = this.faviconURl;

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
    ...mapActions('favorites', [
      'removeFavorite',
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
    },
    deleteHeroEverywhere(heroID) {
      this.deleteHero(heroID);
      if (this.favoritesList.includes(heroID)) {
        this.removeFavorite(heroID)
      }
    },
    switchFilters() {
      this.filterIDQuery = '';
      this.filterNameQuery = '';
      this.filtersActive = !this.filtersActive;
    }
  }
}
</script>
