<template>

  <v-container class="hero-list">
    <v-row>
      <HeroCard
        @click.native.stop="selectHero(hero)"
        v-for="hero in favHeroesList" :key="hero.id"
        :hero="hero"></HeroCard>
    </v-row>

    <heroModal
        :selected-hero="selectedHero"
        v-if="heroModal"
        @close-modal="heroModal = false"
        :hero-modal="heroModal"
    />

  </v-container>
</template>

<script>
import HeroCard from '@/components/HeroCard.vue'
import HeroModal from '@/components/HeroModal.vue'
import {mapState, mapGetters} from 'vuex'

export default {
  //TODO Penser à l'ordre !!
  name: 'FavsList',
  components: {
    HeroModal,
    HeroCard
  },
  data: function () {
    return {
      heroModal: false,
      selectedHero: {},
      page: 1,
      heroesPerPage : process.env.VUE_APP_ITEM_PER_PAGE
    }
  },
  methods: {
    ...mapGetters('heroes', [
      'favorites'
    ]),
    selectHero(hero) {
      this.selectedHero = hero;
      this.heroModal = true;
    },
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
    ]),
    favHeroesList: function(){
      console.log(this.favorites(this.favoritesList));
      return  this.favorites(this.favoritesList);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


.hero-card {
  &:hover {
    cursor: pointer;

    .picture {
      opacity: 1;
    }
  }
}

.picture {
  opacity: 0.7;
  transition: opacity 0.5s;
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
</style>
