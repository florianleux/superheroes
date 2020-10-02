<template>
  <v-row
    class="filters"
    no-gutters
  >
    <v-col>
      <v-text-field
        v-model="nameQuery"
        hide-details
        :label="$t('FILTERS.NAME')"
        clear-icon="fa-times-circle"
        clearable
        @input="$emit('update-name-filter',nameQuery)"
        class="filters__input filters__input--name"
      />
    </v-col>
    <v-col>
      <v-text-field
        v-model="IDQuery"
        hide-details
        reverse
        clear-icon="fa-times-circle"
        :label="$t('FILTERS.ID')"
        @input="$emit('update-id-filter',IDQuery)"
        clearable
        class="filters__input filters__input--id"
      />
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: 'Filters',
  data(){
    return{
      nameQuery : '',
      IDQuery : '',
    }
  }
}
</script>
