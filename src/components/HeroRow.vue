<template>
  <tr
  >
    <td class="img">
      <div class="triangle"/>
      <v-img
          class="picture"
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
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </td>
    <td :title="hero.name">
      <div class="first name">
        {{ hero.name | firstName }}
      </div>
      <div class="second name">
        {{ hero.name | secondName }}
      </div>
    </td>
    <td
        :title="hero.description"
    >
      <div class="description">
        {{ hero.description }}
      </div>
    </td>
    <td class="favorite">
      <v-icon
          class="fav-icon"
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
      if (this.hero.initialValue) {
        if (this.hero.thumbnail.path === this.hero.initialValue.thumbnail.path) {
          return this.hero.thumbnail.path + '/landscape_amazing.' + this.hero.thumbnail.extension
        } else {
          return this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension;
        }
      } else {
        return this.hero.thumbnail.path + '/landscape_amazing.' + this.hero.thumbnail.extension
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
<style lang="scss">
tr {
  opacity: 0.6;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}

td {
  div {
    max-height: 100px !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .name {
    font-family: 'Made Soulmaze';
    width: 260px !important;
    padding: 0 4px;


    &.first {
      white-space: nowrap;
      color: white;
      text-shadow: 3px 3px 0 #000,
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
      font-size: 1.6em !important;
    }

    &.second {
      font-size: 0.9em !important;
      font-style: italic;
    }
  }

  &.img {
    padding: 0 !important;
    position: relative;
    width: 200px !important;

    .triangle {
      position: absolute;
      z-index: 1000;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 101px 0 0 25px;
      border-color: transparent transparent transparent #FFF;

    }
  }

  &.favorite {
    width: 50px !important;
  }

  .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
