<template>
  <v-col
    :key="hero.id"
    cols="6"
    class="col-xl-1 col-lg-2 col-md-3 col-sm-4"
  >
    <v-card
      :title="hero.name"
      class="animate__animated animate__fadeIn hero-card"
      tile
      flat
      @click="$emit('select-hero')"
    >
      <v-icon
        v-if="favoritesList.includes(hero.id)"
        class="hero-card__fav-icon"
        dense
      >
        fa-heart
      </v-icon>
      <v-img
        class="hero-card__picture"
        lazy-src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_fantastic.jpg"
        :src="pictureURL"
        aspect-ratio="1"
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
        <v-card-title class="hero-card__identity">
          <div class="hero-card__name hero-card__name--first">
            {{ hero.name | firstName }}
          </div>
          <div class="hero-card__name hero-card__name--second">
            {{ hero.name | secondName }}
          </div>
        </v-card-title>
      </v-img>
    </v-card>
  </v-col>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'HeroCard',
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
          return this.hero.thumbnail.path + '/standard_fantastic.' + this.hero.thumbnail.extension
        } else {
          return this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension;
        }
    }
  }
}
</script>
