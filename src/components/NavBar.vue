<template>
  <v-container>
    <v-app-bar
      fixed
      class="nav-bar"
      height="80"
    >
      <a
        v-for="(value,locale) in $i18n.messages"
        :key="locale"
        :class="['nav-bar__lang-btn nav-bar__lang-btn--' + locale,{'nav-bar__lang-btn--active': $i18n.locale === locale}]"
        :title="$t('NAVBAR.LANG_' + locale.toUpperCase())"
        @click.prevent="switchLang(locale)"
      >
        <img
          width="25"
          :src="getLocaleImgUrl(locale)"
        >
      </a>
      <img
        class="nav-bar__logo"
        width="100"
        src="@/assets/logo.png"
      >
      <router-link
        v-for="route in $router.options.routes"
        :key="route.name"
        :class="'nav-bar__router-link nav-bar__router-link--' + route.name"
        :to="{name: route.name}"
      >
        <v-badge
          v-if="route.name === 'favs' && favoritesList.length"
          bordered
          color="error"
          offset-x="6"
          offset-y=""
          :content="favoritesList.length"
          overlap
        >
          <v-icon>
            {{ route.icon }}
          </v-icon>
        </v-badge>
        <v-icon v-else>
          {{ route.icon }}
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
    /**
     * @Method to switch the app main language
     * @param {string} lang - New language to apply
     */
    switchLang(lang) {
      this.$i18n.locale = lang;
    },
    getLocaleImgUrl(locale) {
      return require('../assets/icons/' + locale + '.png')
    }
  }
}
</script>
