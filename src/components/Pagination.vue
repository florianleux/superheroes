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
         label="Héros par page"
         @change="changeHeroesPerPage"
         class="heroes-per-page"
     ></v-select>
   </v-col>
    <v-pagination
        v-model="localPage"
        class="no-button "
        total-visible="7"
        circle
        @input="$emit('page-update',localPage)"
        :length="Math.ceil(list.length/heroesPerPage)"
    />
    <v-btn
        @click="previousPage"
        icon
        :title="$t('PAGINATION.PREVIOUS_PAGE')"
        v-if="page>1"
        class="link left"
        x-large
        elevation="6"
    >
      <v-icon>
        fa-angle-left
      </v-icon>
    </v-btn>
    <v-btn
        @click="nextPage"
        :title="nextPageTitle"
        icon
        v-if="hasNextPage"
        :loading="loading"
        class="link right"
        x-large
        elevation="6"
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
    isFavPage: {type: Boolean, default: false}
  },
  data: function () {
    return {
      localPage: this.page,
      loading: false
    }
  },
  watch: {
    '$route'() {
      this.localPage = 1;
    }
  },
  computed: {
    ...mapState('heroes', [
      'heroesPerPage'
    ]),
    isLastPage: function () {
      return this.localPage === (this.list.length / Math.ceil(this.heroesPerPage));
    },
    nextPageIcon() {
      return this.isLastPage ? "fa-plus" : "fa-angle-right";
    },
    nextPageTitle() {
      return this.isLastPage ? this.$t("PAGINATION.FETCH_MORE") : this.$t("PAGINATION.NEXT_PAGE");
    },
    hasNextPage() {
      if (this.isFavPage && this.localPage == Math.ceil(this.list.length / 24) || this.list.length == 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions('heroes', [
      'addNextPage',
      'updateHeroesPerPage'
    ]),
    fetchMore() {
      this.loading = true;
      this.$axios.get(this.$apiURL
          + "/v1/public/characters?apikey="
          + this.$apiPublicKey
          + "&limit=" + this.$apiLimit + "&offset=" + this.$apiLimit * (this.localPage - 1)
      ).then(response => {
        this.addNextPage(response.data.data.results);
        this.$emit('page-update', this.localPage);
      }).finally(() => {
        this.loading = false;
      });
    },
    previousPage() {
      this.localPage--;
      this.$emit('page-update', this.localPage);
    },
    nextPage() {
      let iLP = this.isLastPage;
      this.localPage++;
      iLP ? this.fetchMore() : this.$emit('page-update', this.localPage);
    },
    changeHeroesPerPage(value) {
      this.updateHeroesPerPage(value);

      let lastPage = this.list.length / Math.ceil(this.heroesPerPage);

      if (this.localPage > lastPage) {
        this.localPage = lastPage;
        this.$emit('page-update', this.localPage);
      }
    }
  }
}
</script>
<style lang="scss">
.no-button ul {
  li:last-child, li:first-child {
    display: none;
  }
}

.heroes-per-page{
  max-width: 120px !important;
}

.pagination {
  position: fixed;
  bottom: 0;
  z-index: 12;
  right: 100px;
  left: 100px;

  .link {
    position: fixed;
    top: 50%;
    text-center: inline;
    z-index: 20;

    &.right {
      right: 25px;
    }

    &.left {
      left: 25px;
    }

    &:hover {
      color: #5A5A5A;
      cursor: pointer;
    }
  }
}
</style>


