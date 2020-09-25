<template>
  <v-row justify="center" class="pagination">
    <v-pagination
        v-model="localPage"
        class="no-button "
        total-visible="7"
        circle
        @input="$emit('page-update',localPage)"
        :length="list.length/24"
    />
    <a href="#" @click.stop="previousPage" v-if="page>1" class="link previous-page"><i class="fas fa-angle-left"></i></a>
    <a href="#" @click.stop="nextPage" v-if="!isLastPage" class="link next-page"><i class="fas fa-angle-right"></i></a>
    <a href="#" @click.stop="fetchMore" v-else class="link fetch-more"><i class="fas fa-plus"></i></a>
  </v-row>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Pagination',
  props: {
    list: {type: Array},
    page: {type: Number}
  },
  data: function () {
    return {
      localPage: this.page
    }
  },
  methods: {
    ...mapActions('heroes', [
      'addNextPage'
    ]),
    fetchMore() {
      this.localPage++;
      this.$emit('page-update', this.localPage);
      this.$axios.get(process.env.VUE_APP_API_URL
          + "/v1/public/characters?apikey="
          + process.env.VUE_APP_API_PUBLIC_KEY
          + "&limit=" + process.env.VUE_APP_API_LIMIT + "&offset=" + process.env.VUE_APP_API_LIMIT * (this.localPage - 1)
      ).then(response => {
        this.addNextPage(response.data.data.results);
      });

    },
    previousPage() {
      this.localPage--;
      this.$emit('page-update', this.localPage);
    },
    nextPage() {
      this.localPage++;
      this.$emit('page-update', this.localPage);
    }
  },
  computed: {
    isLastPage: function () {
      return this.localPage === (this.list.length / Math.ceil(process.env.VUE_APP_HEROES_PER_PAGE));
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
  .link {
    position: fixed;
    top: 50%;
    margin-top: -    1em;
    font-size: 3.5em;
    color: #5A5A5A52;
    text-center: inline;
    z-index: 20;

    &.fetch-more {
      font-size: 2.9em;
    }

    &.next-page, &.fetch-more {
      right: 30px;
    }

    &.previous-page {
      left: 30px;
    }

    &:hover {
      color: #5A5A5A;
      cursor: pointer;
    }
  }
}
</style>


