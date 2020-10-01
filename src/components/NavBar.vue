<template>
  <v-container>
    <v-app-bar
        fixed
        class="nav-bar"
        height="80"
    >
      <a
          class="nav-bar__lang-btn nav-bar__lang-btn--en"
          :class="{'nav-bar__lang-btn--active' : $i18n.locale === 'en'}"
          @click.prevent="switchLang('en')"
          :title="$t('NAVBAR.LANG_EN')"
      >
        <v-img
            width="32"
            src="@/assets/icons/en.png"
        />
      </a>
      <a
          class="nav-bar__lang-btn nav-bar__lang-btn--fr"
          :class="{'nav-bar__lang-btn--active' : $i18n.locale === 'fr'}"
          @click.prevent="switchLang('fr')"
          :title="$t('NAVBAR.LANG_FR')"
      >
        <v-img
            width="32"
            src="@/assets/icons/fr.png"
        />
      </a>
      <img
          class="nav-bar__logo"
          width="100"
          src="@/assets/logo.png"
          alt=""
      >
      <router-link
          class="nav-bar__router-link nav-bar__router-link--heroes"
          :title="$t('NAVBAR.HEROES_PAGE')"
          :to="{name: 'heroes'}"
      >
        <v-icon>
          fa-mask
        </v-icon>
      </router-link>
      <router-link
          class="nav-bar__router-link nav-bar__router-link--favs"
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
        <v-icon
            v-else
        >
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
  computed: {
    ...mapState('favorites', [
      'favoritesList'
    ])
  },
  methods: {
    switchLang(lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>
<style lang="scss">
.nav-bar {
  box-shadow: none !important;
  background: white !important;
  margin: auto;
  height: 80px;
  padding: 0 100px;
}

.nav-bar__lang-btn {
  position: absolute;
  top: 30px;
  opacity: 0.6;
  filter: grayscale(1);
}

.nav-bar__lang-btn--active {
  opacity: 1;
  filter: none;
}

.nav-bar__lang-btn--en {
  left: 0;
}

.nav-bar__lang-btn--fr {
  left: 45px;
}

.nav-bar__logo {
  display: block;
  margin: 20px auto auto auto;
}

.nav-bar__router-link {
  position: absolute;
  font-size: 1.7em;
  top: 25px;

  .v-icon {
    color: lightgrey;
  }
}

.nav-bar__router-link--heroes {
  right: 45px;
}

.nav-bar__router-link--favs {
  right: 0px;
}

.router-link-active .v-icon {
  color: #4C4646;
}
</style>
