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
      @create-hero="selectHero(newHeroTemplate(), true)"
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
            @select-hero="selectHero(hero,false)"
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
          {{ noHeroText }}
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
    <HeroModal
      v-if="heroModal"
      :creation-mode="creationMode"
      :selected-hero="selectedHero"
      @close-modal="heroModal = false"
      @update-hero="updateHero"
      @delete-hero="deleteHeroEverywhere"
      @reset-hero="updateHero"
      @create-hero="createNewHero"
    />
    <p class="attribution">
      {{ $t('FOOTER.ATTRIBUTION_MESSAGE') }}
    </p>
  </div>
</template>
<script>
import HeroCard from '@/components/herolist/HeroCard.vue'
import HeroTable from '@/components/herolist/HeroTable.vue'
import HeroModal from '@/components/modals/HeroModal.vue'
import Pagination from '@/components/Pagination.vue'
import Sidebar from '@/components/Sidebar.vue'
import Filters from '@/components/Filters.vue'

import {mapState, mapActions, mapGetters} from 'vuex';

export default {
  name: 'HeroesList',
  components: {
    HeroModal,
    HeroCard,
    HeroTable,
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
      creationMode: false,
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
    '$route': {
      handler: 'routeInit',
      immediate: true
    }
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
    ...mapGetters('favorites', [
      'favorites'
    ]),
    /**
     * @Method to select a hero and open a modal of their details
     * @param {object} hero
     * @param cM creationMode
     */
    selectHero(hero, cM) {
      this.creationMode = cM;
      if (cM) {
        hero.initialValue = {
          name: hero.name,
          description: hero.description,
          thumbnail: {
            path: hero.thumbnail.path,
            extension: hero.thumbnail.extension
          }
        }
        hero.buffered = true;      }

      this.selectedHero = hero;
      this.heroModal = true;
    },
    /**
     * @Method to dispatch action to create new hero
     * @param {object} hero
     */
    createNewHero(hero) {
      this.createHero({newHero: hero, heroIndex: (this.page - 1) * this.heroesPerPage});
      this.creationMode = false;
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
    routeInit() {
      this.page = 1;
      this.filtersActive = false;
      document.title = this.title;
      document.getElementById("favicon").href = this.favicon;
    },
    newHeroTemplate() {
      return {

        id: 'U' + Date.now(),
        name: this.$t('CREATE_MODAL.NEW_HERO_NAME_PLACEHOLDER'),
        description: '',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
          extension: 'jpg'
        }
      }
    }

  }
}
</script>
