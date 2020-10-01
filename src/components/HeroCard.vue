<template>
  <v-col
      cols="6"
      class=" col-xl-1 col-lg-2 col-md-3 col-sm-4"
      :key="hero.id"
  >
    <v-card
        @click="$emit('select-hero')"
        :title="hero.name"
        class="animate__animated animate__fadeIn hero-card hvr-float-shadow"
        tile
        flat
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
          <div class="hero-card__name hero-card__name--first bold">
            {{ hero.name | firstName }}
          </div>
          <div class="hero-card__name hero-card__name--second bold">
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
    hero: Object
  },
  computed: {
    ...mapState('favorites', [
      'favoritesList'
    ]),
    pictureURL() {
      if (this.hero.initialValue) {
        if (this.hero.thumbnail.path === this.hero.initialValue.thumbnail.path) {
          return this.hero.thumbnail.path + '/standard_fantastic.' + this.hero.thumbnail.extension
        } else {
          return this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension;
        }
      } else {
        return this.hero.thumbnail.path + '/standard_fantastic.' + this.hero.thumbnail.extension
      }
    }
  }
}
</script>
<style lang="scss">
.hero-card {
  &:hover {
    cursor: pointer;

    .hero-card__picture {
      opacity: 1;
      filter: none;
    }
  }
}

.hero-card__fav-icon {
  z-index: 1;
  color: red !important;
  position: absolute !important;
  top: 5px;
  right: 5px;
}

.hero-card__picture {
  opacity: 0.6;
  filter: grayscale(0.5);
  position: relative;
  transition: opacity 0.35s;
  background-image: url('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_fantastic.jpg');
  background-size: cover;
}

.hero-card__identity {
  color: white;
  display: block !important;
  bottom: 0;
  position: absolute;
  left: 0;
  right: 0;
  padding: 10px;
}

.hero-card__name {
  text-align: center;
  word-break: normal;
  line-height: 1;
  -webkit-text-stroke: 1px black;
  color: white;
}

.hero-card__name--first {
  overflow-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.8em;
  text-shadow: 3px 3px 0 #000,
  -1px -1px 0 #000,
  1px -1px 0 #000,
  -1px 1px 0 #000,
  1px 1px 0 #000;
}

.hero-card__name--second {
  font-size: 0.6em;
}

</style>
