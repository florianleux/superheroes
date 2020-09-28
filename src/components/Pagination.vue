<template>
  <v-row
      justify="center"
      class="pagination"
  >
    <v-pagination
        v-model="localPage"
        class="no-button "
        total-visible="7"
        circle
        @input="$emit('page-update',localPage)"
        :length="Math.ceil(list.length/24)"
    />
    <v-btn
        @click="previousPage"
        icon
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
import {mapActions} from 'vuex';

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
    isLastPage: function () {
      return this.localPage === (this.list.length / Math.ceil(process.env.VUE_APP_HEROES_PER_PAGE));
    },
    nextPageIcon() {
      return this.isLastPage ? "fa-plus" : "fa-angle-right";
    },
    hasNextPage() {
      if (this.isFavPage && this.localPage == Math.ceil(this.list.length / 24)) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions('heroes', [
      'addNextPage'
    ]),
    fetchMore() {
      this.loading = true;
      this.$axios.get(process.env.VUE_APP_API_URL
          + "/v1/public/characters?apikey="
          + process.env.VUE_APP_API_PUBLIC_KEY
          + "&limit=" + process.env.VUE_APP_API_LIMIT + "&offset=" + process.env.VUE_APP_API_LIMIT * (this.localPage - 1)
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

.pagination {
  position: fixed;
  top:75px;
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


