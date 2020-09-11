<template>
  <v-app>
    <NavBar></NavBar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',

  components: {
    NavBar
  },
  data: () => ({
    //
  }),
  created () {
    this.$axios.get(process.env.VUE_APP_API_URL+"/v1/public/characters?apikey="+process.env.VUE_APP_API_PUBLIC_KEY+"&limit=18").then(response =>{
      this.$store.commit('updateList', response.data.data.results);
    });
  }
};
</script>

<style lang="scss" >

  @font-face {
    font-family: "Made Soulmaze";
    src: url("assets/fonts/MadeSoulmaze.otf") format("opentype");
  }

  @font-face {
    font-family: "Made Soulmaze";
    src: url("assets/fonts/MadeSoulMazeItalic.otf") format("opentype");
    font-style: italic;
  }

  .bold{
    font-family: "Made Soulmaze";

    &.italic{
      font-style: italic;
    }
  }


  @font-face {
    font-family: "Apollo";
    src: url("assets/fonts/Apollo.otf") format("opentype");
  }

  *{
    font-family: "Apollo";
  }
  /*Effet Hover issu de HoverMaster*/

  /* Float Shadow */
  .hvr-float-shadow {
    position: relative;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
  }

  .hvr-float-shadow:hover, .hvr-float-shadow:focus, .hvr-float-shadow:active {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
    /* move the element up by 5px */
  }


  .v-dialog{
    overflow: hidden !important;
  }

</style>
