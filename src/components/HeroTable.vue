<template>
  <v-simple-table
      fixed-header
      :height="tableHeight"
  >
    <thead>
      <tr>
        <th class="img"/>
        <th>
          Nom
        </th>
        <th>
          Description
        </th>
        <th class="fav"/>
      </tr>
    </thead>
    <tbody>
      <HeroRow
          v-for="hero in list.slice(heroesPerPage*(page-1),heroesPerPage*(page))"
          :key="hero.id"
          :hero="hero"
          @click.native="$emit('select-hero',hero)"
      />
    </tbody>
  </v-simple-table>
</template>
<script>
import HeroRow from '@/components/HeroRow.vue'
import {mapState} from 'vuex';

export default {
  name: 'HeroTable',
  components: {
    HeroRow
  },
  data() {
    return {
      containerWidth: document.getElementsByClassName('hero-list')[0].offsetHeight
    }
  },
  props: {
    list: {type: Array, default: () => []},
    page: {type: Number, default: 1}
  },
  computed: {
    ...mapState('heroes', [
      'heroesPerPage'
    ]),
    tableHeight() {
      return this.containerWidth;
    }
  },
  //TODO gérer la height d'une meilleure façon
  mounted() {
    window.addEventListener('resize', () => {
      this.containerWidth = document.getElementsByClassName('hero-list')[0].offsetHeight
    })
  },

}
</script>
<style lang="scss">
</style>
