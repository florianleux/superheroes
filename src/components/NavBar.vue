<template>
  <v-container>
    <v-app-bar
      fixed
      class="nav-bar"
      height="80"
    >
      <a
        class="nav-bar__lang-btn nav-bar__lang-btn--en"
        :class="{'nav-bar__lang-btn--active': $i18n.locale === 'en'}"
        :title="$t('NAVBAR.LANG_EN')"
        @click.prevent="switchLang('en')"
      >
        <v-img
          width="25"
          src="@/assets/icons/en.png"
        />
      </a>
      <a
        class="nav-bar__lang-btn nav-bar__lang-btn--fr"
        :class="{'nav-bar__lang-btn--active': $i18n.locale === 'fr'}"
        :title="$t('NAVBAR.LANG_FR')"
        @click.prevent="switchLang('fr')"
      >
        <v-img
          width="25"
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
        :to="{name: 'favs'}"
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
    /**
     * @Method to switch the app main language
     * @param {string} lang - New language to apply
     */
    switchLang(lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>
