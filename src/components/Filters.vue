<template>
  <v-row
    class="filters"
    no-gutters
  >
    <v-col>
      <v-checkbox
        v-model="picturesOnly"
        hide-details
        class="filters__checkbox filters__checkbox--picture"
        dense
        :label="$t('FILTERS.PICTURE')"
        @change="$emit('toggle-picture-filter')"
      />
    </v-col>
    <v-col>
      <v-text-field
        v-model="IDQuery"
        hide-details
        clear-icon="fa-times-circle"
        :label="$t('FILTERS.ID')"
        clearable
        class="filters__input filters__input--id"
        @input="$emit('update-id-filter',IDQuery)"
      />
      <v-text-field
        v-model="nameQuery"
        hide-details
        :label="$t('FILTERS.NAME')"
        clear-icon="fa-times-circle"
        clearable
        class="filters__input filters__input--name"
        @input="$emit('update-name-filter',nameQuery)"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Filters',
  data() {
    return {
      nameQuery: '',
      IDQuery: '',
      picturesOnly: false
    }
  }
}
</script>
