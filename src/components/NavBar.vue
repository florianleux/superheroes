<template>
  <v-container>
    <v-app-bar
        fixed
        id="navBar"
        height="80"
    >
      <a
          class="btn-lang en"
          :class="{'active' : $i18n.locale === 'en'}"
          @click.prevent="switchLang('en')"
          :title="$t('NAVBAR.LANG_EN')"
      >
        <v-img
            width="32"
            src="@/assets/icons/en.png"
        />
      </a>
      <a
          class="btn-lang fr"
          :class="{'active' : $i18n.locale === 'fr'}"
          @click.prevent="switchLang('fr')"
          :title="$t('NAVBAR.LANG_FR')"
      >
        <v-img
            width="32"
            src="@/assets/icons/fr.png"
        />
      </a>


      <img
          class="logo"
          width="100"
          src="@/assets/logo.png"
          alt=""
      >
      <router-link
          class="nav-link heroes"
          :title="$t('NAVBAR.HEROES_PAGE')"
          :to="{name: 'heroes'}"
      >
        <v-icon>
          fa-mask
        </v-icon>
      </router-link>
      <router-link
          class="nav-link favs "
          :title="$t('NAVBAR.FAVORITES_PAGE')"
          :to="{name:'favs'}"
      >
        <v-badge
            v-if="favoritesList.length"
            bordered
            color="error"
            offset-x="6"
            offset-y=""
            :content="favoritesList.length"
            overlap
        >
          <v-icon>
            fa-heart
          </v-icon>
        </v-badge>
        <v-icon v-else>
          fa-heart
        </v-icon>
      </router-link>
    </v-app-bar>
  </v-container>
</template>
<script>
import {mapState} from 'vuex';

export default {
  name: 'NavBar',
  methods: {
    switchLang(lang) {
      this.$i18n.locale = lang;
    }
  },
  computed: {
    ...mapState('favorites', [
      'favoritesList'
    ])
  }
}
</script>
<style
    lang="scss"
    scoped
>
#navBar {
  box-shadow: none;
  background: white;
  margin-bottom: 5px;
  margin: auto;
  height: 80px;
  padding: 0 100px;
}

.btn-lang{
  position: absolute;
  top: 30px;
  opacity: 0.6;
  filter: grayscale(1);

  &.active {
    opacity: 1;
    filter: none;
  }

  &.en {
    left: 0;
  }

  &.fr {
    left: 45px;
  }
}

.logo {
  display: block;
  margin: auto;
  margin-top: 20px;
}

.nav-link {
  position: absolute;
  font-size: 1.7em;
  top: 25px;

  color: #5A5A5A52 !important;

  &.heroes {
    right: 45px;
  }

  &.favs {
    right: 0px;
  }

  &.router-link-active {
    color: #4C4646 !important;
  }

}
</style>
