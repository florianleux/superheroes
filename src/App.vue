<template>
  <v-app>
    <NavBar></NavBar>
    <router-view></router-view>
    <p class="attribution">Data provided by Marvel. © 2014 Marvel</p>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import {mapActions} from 'vuex';
import router from "@/router";

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
    //
  }),
  mounted() {
    router.push({name: 'heroes'}).catch(()=>{});
  },
  methods: {
    ...mapActions('heroes', [
      'updateList'
    ])
  },
  created() {
    this.$axios.get(this.$apiURL
        + "/v1/public/characters?apikey="
        + this.$apiPublicKey
        + "&limit=" + this.$apiLimit
    ).then(response => {
      this.updateList(response.data.data.results);
    });
  }
};
</script>

<style lang="scss">

body {
  overflow: hidden;
  position: fixed;
}

.v-snack__content{
  text-align: center;
}

@font-face {
  font-family: "Made Soulmaze";
  src: url("assets/fonts/MadeSoulmaze.otf") format("opentype");
}

@font-face {
  font-family: "Made Soulmaze";
  src: url("assets/fonts/MadeSoulMazeItalic.otf") format("opentype");
  font-style: italic;
}

.bold {
  font-family: "Made Soulmaze";

  &.italic {
    font-style: italic;
  }
}

@font-face {
  font-family: "Apollo";
  src: url("assets/fonts/Apollo.otf") format("opentype");
}

* {
  font-family: "Apollo";
}

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

.v-dialog {
  overflow: hidden !important;
}

.attribution {
  position: fixed;
  bottom: 3px;
  width: 100%;
  text-align: center;
  font-size: 0.8em;
}
</style>
