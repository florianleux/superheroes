<template>
  <v-app>
    <NavBar></NavBar>
    <router-view :heroesList="list"></router-view>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',

  components: {
    NavBar
  },
  props:{
    list : null
  },
  data: () => ({
    //
  }),
  mounted () {
    this.$axios.get(process.env.VUE_APP_API_URL+"/v1/public/characters?apikey="+process.env.VUE_APP_API_PUBLIC_KEY).then(response => (console.log(this.list = response.data.data.results)))
  }
};
</script>

<style>

  @font-face {
    font-family: "Heroes Legend";
    src: url("assets/fonts/HeroesLegend.ttf") format("truetype");
  }
</style>
