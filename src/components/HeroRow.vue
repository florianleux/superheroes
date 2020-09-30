<template>
  <tr
  >
    <td class="img">
      <v-img
          class="picture"
          lazy-src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/landscape_amazing.jpg"
          :src="pictureURL"
          aspect-ratio="1.8"
          width="300"
      />
    </td>
    <td>
      <div class="name">
        {{ hero.name }}
      </div>
    </td>
    <td>
      <div class="description">
        {{ hero.description }}
      </div>
    </td>
    <td>
      <v-icon> fa-heart</v-icon>
    </td>
  </tr>
</template>
<script>
export default {
  name: 'HeroRow',
  props: {
    hero: {
      type: Object, default: () => {
      }
    }
  },
  computed: {
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
    }
  }
}
</script>
<style lang="scss">
tr:hover {
  cursor: pointer;

  td.img {
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
    font-size: 1.4em !important;

  }

  &.img {
    padding: 0 !important;
    opacity: 0.6;
    max-width: 200px !important;
  }

  .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
