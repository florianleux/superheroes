<template>
  <v-simple-table
    fixed-header
    :height="tableHeight"
    dense
  >
    <thead>
      <tr class="hero-table__header-row">
        <th class="hero-table__header-cell" />
        <th class="hero-table__header-cell">
          {{ $t('LIST.NAME') }}
        </th>
        <th class="hero-table__header-cell">
          {{ $t('LIST.DESCRIPTION') }}
        </th>
        <th class="hero-table__header-cell" />
      </tr>
    </thead>
    <tbody>
      <HeroRow
        v-for="hero in list.slice(heroesPerPage * (page - 1),heroesPerPage * (page))"
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
  props: {
    list: {type: Array, default: () => []},
    page: {type: Number, default: 1}
  },
  data() {
    return {
      containerWidth: document.getElementsByClassName('hero-list')[0].offsetHeight
    }
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
  }
}
</script>
