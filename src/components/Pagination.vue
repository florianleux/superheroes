<template>

</template>

<script>
  export default {
    name: 'Pagination',
    data: function(){
      return{
       page :1
      }
    },
    computed: {
    },
    methods:{
      nextPage() {
        console.log("next page");
              this.page++;
        if(this.heroesList.results.length < 18*this.page){
          this.$axios.get(process.env.VUE_APP_API_URL
                  +"/v1/public/characters?apikey="
                  +process.env.VUE_APP_API_PUBLIC_KEY
                  +"&limit="+process.env.VUE_APP_API_LIMIT+"&offset="+process.env.VUE_APP_API_LIMIT*(this.page-1)
          ).then(response =>{
            console.log(response.data.data.results);
            this.$store.commit('nextPage', response.data.data.results);
          });
        }
        console.log(this.page);
      },
      previousPage(){
        console.log("previousPage");
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
