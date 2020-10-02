<template>
  <div>
    <v-expand-transition>
      <Filters
        v-if="filtersActive"
        @update-name-filter="updateNameFilterQuery"
        @update-id-filter="updateIDFilterQuery"
        @toggle-picture-filter="filterPictureOnly = !filterPictureOnly"
      />
    </v-expand-transition>
    <Sidebar
      :filters-active="filtersActive"
      @create-hero="createModal = true"
      @toggle-filters="toggleFilters"
    />
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
    <Pagination
      v-if="list.length"
      :page="page"
      :list="list"
      :is-fav-page="isFavPage"
      :is-search-active="isSearchActive"
      :card-display="cardDisplay"
      @page-update="updatePage"
      @toggle-display="cardDisplay = !cardDisplay"
    />
    <HeroDetailsModal
      v-if="heroModal"
      :selected-hero="selectedHero"
      :hero-modal="heroModal"
      @close-modal="heroModal = false"
      @update-hero="updateHero"
      @delete-hero="deleteHeroEverywhere"
      @reset-hero="updateHero"
    />
    <NewHeroModal
      v-if="createModal"
      :create-modal="createModal"
      @close-modal="createModal = false"
      @create-hero="createNewHero"
    />
  </div>
</template>
<script>
import HeroCard from '@/components/herolist/HeroCard.vue'
import HeroTable from '@/components/herolist/HeroTable.vue'
import HeroDetailsModal from '@/components/modals/HeroDetailsModal.vue'
import NewHeroModal from '@/components/modals/NewHeroModal.vue'
import Pagination from '@/components/Pagination.vue'
import Sidebar from '@/components/Sidebar.vue'
import Filters from '@/components/Filters.vue'

import {mapState, mapActions, mapGetters} from 'vuex';

export default {
  name: 'HeroesList',
  components: {
    HeroDetailsModal,
    HeroCard,
    HeroTable,
    NewHeroModal,
    Pagination,
    Sidebar,
    Filters,
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
      filterIDQuery: '',
      filterPictureOnly: false,
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
      console.debug("in");
      let listToFilter = this.isFavPage ? this.favorites(this.favoritesList) : this.heroesList;

      return this.filterList(listToFilter);
    },
    isSearchActive() {
      return !!(this.filterNameQuery || this.filterIDQuery);
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
    /**
     * @Method to select a hero and open a modal of their details
     * @param {object} hero
     */
    selectHero(hero) {
      this.selectedHero = hero;
      this.heroModal = true;
      if (!hero.buffered) {
        this.bufferHero(hero.id)
      }
    },
    /**
     * @Method to dispatch action to create new hero
     * @param {object} hero
     */
    createNewHero(hero) {
      this.createHero({newHero: hero, heroIndex: (this.page - 1) * this.heroesPerPage});
    },
    /**
     * @Method to update page value from Pagination component emit
     * @param {number} newPage
     */
    updatePage(newPage) {
      this.page = newPage;
    },
    /**
     * @Method to delete hero in heroesList AND favoritesList if they are in favorites
     * @param {number} heroID
     */
    deleteHeroEverywhere(heroID) {
      this.deleteHero(heroID);
      if (this.favoritesList.includes(heroID)) {
        this.removeFavorite(heroID)
      }
    },
    /**
     * @Method to toggle filters and reset filter queries
     */
    toggleFilters() {
      this.filterIDQuery = '';
      this.filterNameQuery = '';
      this.filterPictureOnly = false;
      this.filtersActive = !this.filtersActive;
    },
    /**
     * @Method to update name filter query with new value from Filter component
     * @param {string} newQuery
     */
    updateNameFilterQuery(newQuery) {
      this.filterNameQuery = newQuery;
    },
    /**
     * @Method to update ID filter query with new value from Filter component
     * @param {string} newQuery
     */
    updateIDFilterQuery(newQuery) {
      this.filterIDQuery = newQuery;
    },
    filterList(listToFilter) {
      let _this = this,
        noPictureRegex = new RegExp('image_not_available', 'gmi'),
        filterNameRegex = new RegExp(this.filterNameQuery, 'gmi'),
        filterIDRegex = new RegExp(this.filterIDQuery, 'gmi');

      if (this.filterPictureOnly) {
        listToFilter = listToFilter.filter(function (hero) {
          return (hero.thumbnail.path).match(noPictureRegex) === null;
        });
      }

      if (this.filterNameQuery && this.filterIDQuery) {
        _this.page = 1

        return listToFilter.filter(function (hero) {
          return (hero.name).match(filterNameRegex) !== null && (hero.id.toString()).match(filterIDRegex) !== null;
        });

      } else if (this.filterNameQuery) {
        _this.page = 1

        return listToFilter.filter(function (hero) {
          return (hero.name).match(filterNameRegex) !== null;
        });
      } else if (this.filterIDQuery) {
        _this.page = 1

        return listToFilter.filter(function (hero) {
          return (hero.id.toString()).match(filterIDRegex) !== null;
        });
      } else {
        return listToFilter;
      }
    }
  }
}
</script>
