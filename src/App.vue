<template>
  <v-app>
    <NavBar />
    <router-view />
  </v-app>
</template>
<script>
import {mapActions} from 'vuex';

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
  //TODO gérer 404
  methods: {
    ...mapActions('heroes', [
      'updateList'
    ])
  }
};
</script>
