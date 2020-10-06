<template>
  <div class="sidebar">
    <v-btn
      v-if="hasRawList"
      class="sidebar__btn sidebar__btn--filters"
      :class="{'sidebar__btn--active': filtersActive}"
      fab
      x-small
      elevation="2"
      :title="$t('FILTERS.BTN_TITLE')"
      @click="$emit('toggle-filters')"
    >
      <!--      TODO Checker le réglage multiline de WebStorm-->
      <v-icon color="grey darken-1">
        fa-filter
      </v-icon>
    </v-btn>
    <v-btn
      class="sidebar__btn sidebar__btn--create-hero"
      fab
      x-small
      elevation="2"
      @click="$emit('create-hero')"
    >
      <v-badge
        color="red"
        bordered
        icon="fa-plus"
        offset-x="5"
        offset-y="9"
      >
        <v-icon color="grey darken-1">
          fa-mask
        </v-icon>
      </v-badge>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  props: {
    hasRawList: {type: Boolean, default: false},
    filtersActive: {type: Boolean, default: false}
  }
}
</script>
