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
    this.$axios.get(process.env.VUE_APP_API_URL+"/v1/public/characters?apikey="+process.env.VUE_APP_API_PUBLIC_KEY).then(response =>{
      this.$store.commit('updateList', response.data.data.results);
    });
  }
};
</script>

<style>

  @font-face {
    font-family: "Heroes Legend";
    src: url("assets/fonts/HeroesLegend.ttf") format("truetype");
  }

  /*Effet Hover issu de HoverMaster*/

  /* Float Shadow */
  .hvr-float-shadow {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
  }
  .hvr-float-shadow:before {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    content: '';
    top: 100%;
    left: 5%;
    height: 10px;
    width: 90%;
    opacity: 0;
    background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
    /* W3C */
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform, opacity;
    transition-property: transform, opacity;
  }
  .hvr-float-shadow:hover, .hvr-float-shadow:focus, .hvr-float-shadow:active {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
    /* move the element up by 5px */
  }
  .hvr-float-shadow:hover:before, .hvr-float-shadow:focus:before, .hvr-float-shadow:active:before {
    opacity: 1;
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
    /* move the element down by 5px (it will stay in place because it's attached to the element that also moves up 5px) */
  }

</style>
