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
      :has-raw-list="rawList.length > 0"
      :filters-active="filtersActive"
      @create-hero="createModal = true"
      @toggle-filters="toggleFilters"
    />
    <v-container
      :class="{'hero-list--card-display': cardDisplay, 'hero-list--filters-active': filtersActive}"
      class="hero-list"
      fluid
    >
      <template
        v-if="list.length"
      >
        <v-row
          v-if="cardDisplay"
          dense
        >
          <HeroCard
            v-for="hero in paginatedList"
            :key="hero.id"
            :hero="hero"
            @select-hero="selectHero(hero)"
          />
        </v-row>
        <HeroTable
          v-else
          :list="paginatedList"
          :page="page"
          @select-hero="selectHero"
        />
      </template>
      <template
        v-else
      >
        <p class="no-data-text mt-6">
          {{noHeroText}}
        </p>
      </template>
    </v-container>
    <Pagination
      v-if="list.length"
      :page="page"
      :list="list"
      :is-fav-page="isFavPage"
      :is-search-active="isFiltersActive"
      :card-display="cardDisplay"
      @page-update="updatePage"
      @toggle-display="cardDisplay = !cardDisplay"
    />
    <!--    TODO Globaliser la modal -->
    <HeroDetailsModal
      v-if="heroModal"
      :selected-hero="selectedHero"
      @close-modal="heroModal = false"
      @update-hero="updateHero"
      @delete-hero="deleteHeroEverywhere"
      @reset-hero="updateHero"
    />
    <NewHeroModal
      v-if="createModal"
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
    favicon: {type: String, default: process.env.BASE_URL + 'favicon.ico'},
    title: {type: String, default: ''}
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
    rawList() {
      return this.isFavPage ? this.favorites(this.favoritesList) : this.heroesList;
    },
    list() {
      let listToFilter = this.rawList;

      //Apply picture-only filter on the list if it is set
      if (this.filterPictureOnly) {
        listToFilter = listToFilter.filter(hero => {
          return !hero.thumbnail.path.includes('image_not_available');
        });
      }

      //Apply name filter on the list if it is set
      if (this.filterNameQuery) {
        listToFilter = listToFilter.filter(hero => {
          return hero.name.toLowerCase().includes(this.filterNameQuery);
        });
      }

      //Apply id filter on the list if it is set
      if (this.filterIDQuery) {
        listToFilter = listToFilter.filter(hero => {
          return hero.id.toString().includes(this.filterIDQuery);
        });
      }

      return listToFilter;
    },
    paginatedList() {
      return this.list.slice(this.heroesPerPage * (this.page - 1), this.heroesPerPage * (this.page))
    },
    isFiltersActive() {
      return this.filterNameQuery || this.filterIDQuery || this.filterPictureOnly;
    },
    noHeroText() {
      if (this.isFiltersActive) {
        return this.$t("LIST.NO_FILTERS_RESULT");
      } else if (this.isFavPage) {
        return this.$t("LIST.NO_FAVORITES");
      } else {
        return this.$t("LIST.NO_HERO");
      }
    }
  },
  watch: {
    '$route'() {
      let favicon = document.getElementById("favicon");

      this.page = 1;
      this.filtersActive = false;
      document.title = this.title;
      favicon.href = this.favicon;
    }
  },
  created() {
    document.title = this.title;
  },
  methods: {
    ...mapActions('heroes', [
      'updateList',
      'updateHero',
      'createHero',
      'deleteHero',
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
    }
  }
}
</script>
