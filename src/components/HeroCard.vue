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
    >

      <v-icon
          v-if="favoritesList.includes(hero.id)"
          class="fav-icon"
      >
        fa-heart
      </v-icon>

      <v-img
          class="picture"
          lazy-src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_fantastic.jpg"
          :src="hero.thumbnail.path+'/standard_fantastic.'+hero.thumbnail.extension"
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
            ></v-progress-circular>
          </v-row>
        </template>
        <v-card-title class="name-zone">
          <div class="name bold">
            {{ getFirstName(hero.name) }}
          </div>
          <div
              class="subname bold"
              v-if="getSecondName(hero.name) !=''"
          >
            ({{ getSecondName(hero.name) }})
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
  methods: {
    getFirstName(fullName) {
      return fullName.split("(")[0];
    },
    getSecondName(fullName) {
      let subNameRegex = /\(([^)]+)\)/,
          match = subNameRegex.exec(fullName);

      if (match) {
        return match[1];
      } else {
        return ''
      }
    }
  },
  computed: {
    ...mapState('favorites', [
      'favoritesList'
    ])
  }

}
</script>
<style lang="scss">
.hero-card {
  &:hover {
    cursor: pointer;

    .picture {
      opacity: 1;
    }
  }
  .fav-icon {
    z-index: 1;
    color: red;
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .picture {
    opacity: 0.65;
    transition: opacity 0.35s;
  }

  .hero-modal {
    max-height: 70%;
  }

  .name-zone {
    color: white;
    display: block;
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    padding: 10px;

    div {
      text-align: center;
      word-break: normal;
      line-height: 1;
      -webkit-text-stroke: 1px black;
      color: white;

    }
  }

  .name {
    font-size: 0.8em;
    text-shadow: 3px 3px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  }

  .subname {
    font-size: 0.6em;
  }
}
</style>
