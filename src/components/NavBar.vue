<template>
  <div>
    <v-app-bar
            id="navBar"
    >

     <img  class="logo" width="100" src="@/assets/logo.png" alt="">
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
  }
</script>

<style>
  #navBar{
    box-shadow: none;
    background: white;
    margin-bottom:5px;
 }

  .logo{
    display: block;
    margin:auto;
    margin-top: 15px;
  }

</style>
