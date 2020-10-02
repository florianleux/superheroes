<template>
  <v-app>
    <NavBar />
    <router-view />
    <p class="attribution">
      {{ $t('FOOTER.ATTRIBUTION_MESSAGE') }}
    </p>
  </v-app>
</template>
<script>
import {mapActions} from 'vuex';

import router from "@/router";

import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  created() {
    this.$axios.get(this.$apiURL
      + "/v1/public/characters?apikey="
      + this.$apiPublicKey
      + "&limit=" + this.$apiLimit
    ).then(response => {
      this.updateList(response.data.data.results);
    });
  },
  mounted() {
    router.push({name: 'heroes'}).catch(() => {
    });
  },
  methods: {
    ...mapActions('heroes', [
      'updateList'
    ])
  }
};
</script>
