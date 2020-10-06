<template>
  <v-row
    justify="center"
    class="pagination"
  >
    <v-col>
      <v-select
        :items="[6,12,24,48]"
        :value="heroesPerPage"
        outlined
        dense
        :label="$t('PAGINATION.HEROES_PER_PAGE')"
        class="pagination__select"
        @change="changeHeroesPerPage"
      />
      <v-icon
        dense
        small
        class="pagination__display-icon"
        :title="displayIconTitle"
        @click="$emit('toggle-display')"
      >
        {{ displayIconText }}
      </v-icon>
    </v-col>
    <v-pagination
      v-model="localPage"
      class="pagination__component pagination__component--no-btn "
      total-visible="5"
      circle
      :length="Math.ceil(list.length / heroesPerPage)"
      @input="$emit('page-update',localPage)"
    />
    <v-btn
      v-if="page > 1"
      icon
      :title="$t('PAGINATION.PREVIOUS_PAGE')"
      class=" pagination__page-link pagination__page-link--previous"
      x-large
      elevation="2"
      @click="previousPage"
    >
      <v-icon>
        fa-angle-left
      </v-icon>
    </v-btn>
    <v-btn
      v-if="hasNextPage"
      :title="nextPageTitle"
      icon
      :loading="loading"
      class="pagination__page-link pagination__page-link--next"
      x-large
      elevation="2"
      @click="nextPage"
    >
      <v-icon>
        {{ nextPageIcon }}
      </v-icon>
    </v-btn>
  </v-row>
</template>
<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'Pagination',
  props: {
    list: {type: Array, default: () => []},
    page: {type: Number, default: 1},
    isFavPage: {type: Boolean, default: false},
    isSearchActive: {type: Boolean, default: false},
    cardDisplay: {type: Boolean, default: true}
  },
  data() {
    return {
      localPage: this.page,
      loading: false
    }
  },
  computed: {
    ...mapState('heroes', [
      'heroesPerPage'
    ]),
    isLastPage() {
      return this.localPage === Math.ceil(this.list.length / (this.heroesPerPage));
    },
    nextPageIcon() {
      return this.isLastPage ? "fa-plus" : "fa-angle-right";
    },
    nextPageTitle() {
      return this.isLastPage ? this.$t("PAGINATION.FETCH_MORE") : this.$t("PAGINATION.NEXT_PAGE");
    },
    hasNextPage() {
      if ((this.isFavPage || this.isSearchActive) && this.localPage == Math.ceil(this.list.length / 24) || this.list.length == 0) {
        return false
      } else {
        return true
      }
    },
    displayIconText() {
      return this.cardDisplay ? 'fa-list' : 'fa-address-card';
    },
    displayIconTitle() {
      return this.cardDisplay ? this.$t('PAGINATION.TOGGLE_DISPLAY_LIST') : this.$t('PAGINATION.TOGGLE_DISPLAY_CARD');
    }
  },
  watch: {
    '$route'() {
      this.localPage = 1;
    },
    page(){
      this.localPage = this.page;
    },
    list(){
      if(this.localPage > Math.ceil(this.list.length / (this.heroesPerPage))){
        this.localPage = 1;
        this.$emit('page-update', this.localPage);
      }
    }
  },
  methods: {
    ...mapActions('heroes', [
      'addNextPage',
      'updateHeroesPerPage'
    ]),
    /**
     * @Method to fetch more from Marvel Api
     */
    fetchMore() {
      this.loading = true;
      this.$axios.get(this.$apiURL
        + "/v1/public/characters?apikey="
        + this.$apiPublicKey
        + "&limit=" + this.$apiLimit + "&offset=" + this.heroesPerPage * (this.localPage - 1)
      ).then(response => {
        this.addNextPage(response.data.data.results);
        this.$emit('page-update', this.localPage);
      }).finally(() => {
        this.loading = false;
      });
    },
    /**
     * @Method to go to the previous page on the list
     */
    previousPage() {
      this.localPage--;
      this.$emit('page-update', this.localPage);
    },
    /**
     * @Method to go to the next page on the list
     */
    nextPage() {
      let iLP = this.isLastPage;
      this.localPage++;
      iLP ? this.fetchMore() : this.$emit('page-update', this.localPage);
    },
    /**
     * @Method to go to the next page on the list
     * @param {number} value - Number of heroes per page
     */
    changeHeroesPerPage(value) {
      this.updateHeroesPerPage(value);
      let lastPage = Math.ceil(this.list.length / Math.ceil(this.heroesPerPage));

      if (this.localPage > lastPage) {
        this.localPage = lastPage;
        this.$emit('page-update', this.localPage);
      }
    }
  }
}
</script>


