<template>
  <tr class="hero-row">
    <td class="hero-row__cell hero-row__cell--image pa-0">
      <div class="hero-row__triangle hero-row__triangle--right " />
      <v-img
        lazy-src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/landscape_amazing.jpg"
        :src="pictureURL"
        aspect-ratio="1.8"
        width="200"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            />
          </v-row>
        </template>
      </v-img>
    </td>
    <td
      class="hero-row__cell pb-3"
      :title="hero.name"
    >
      <div class="hero-row__name hero-row__name--first py-0 px-1">
        {{ hero.name | firstName }}
      </div>
      <div class="hero-row__name hero-row__name--second py-0 px-1">
        {{ hero.name | secondName }}
      </div>
    </td>
    <td
      class="hero-row__cell pb-3"
      :title="hero.description"
    >
      <div class="hero-row__description">
        {{ hero.description }}
      </div>
    </td>
    <td class="hero-row__cell hero-row__cell--favorite pb-3 pr-3">
      <v-icon
        :color="favIconColor"
        dense
      >
        fa-heart
      </v-icon>
    </td>
  </tr>
</template>
<script>
import {mapState} from 'vuex';

export default {
  name: 'HeroRow',
  props: {
    hero: {
      type: Object, default: () => {
      }
    }
  },
  computed: {
    ...mapState('favorites', [
      'favoritesList'
    ]),
    pictureURL() {
        if (this.hero.thumbnail.path === this.hero.initialValue.thumbnail.path) {
          return this.hero.thumbnail.path + '/landscape_amazing.' + this.hero.thumbnail.extension
        } else {
          return this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension;
        }
      },
    isFavorite() {
      return this.favoritesList.includes(this.hero.id);
    },
    favIconColor() {
      return this.isFavorite ? 'red' : 'grey lighten-2'
    }
  }
}
</script>
