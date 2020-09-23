<template>
  <v-container>
    <v-app-bar
            fixed
            id="navBar"
            height="80"
    >

     <img  class="logo" width="100" src="@/assets/logo.png" alt="">

    <router-link class="nav-link heroes" title="Liste des héros"  :to="{name: 'heroes'}"><i class="fas fa-mask"></i></router-link>
      <router-link class="nav-link favs " title="Vos héros favoris" :to="{name:'favs'}"><i class="fas fa-heart"></i></router-link>

    </v-app-bar>
  </v-container>
</template>

<script>
  export default {
    name: 'NavBar',
  }
</script>

<style lang="scss">
  #navBar{
    box-shadow: none;
    background: white;
    margin-bottom:5px;
      margin: auto;
      height: 80px;
    padding: 0 100px;
 }

  .logo{
    display: block;
    margin:auto;
    margin-top: 10px;
  }

  .nav-link {
      position: absolute;
      font-size: 1.7em;
        top: 25px;

         color:#5a5a5a52 !important;

      &.heroes{
          right :60px;
      }

      &.favs{
          right:15px;
      }

      &.router-link-active{
           color:#4c4646 !important;
       }

  }
</style>
