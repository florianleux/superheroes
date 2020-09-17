<template>
    <v-container class="hero-list">
        <v-row>
            <v-col cols="2" v-for="hero in heroesList.results.slice(18*(page-1),18*(page))" :key="hero.id">
                <v-card @click.stop="selectHero(hero)" :title="hero.name" class="animate__animated animate__fadeIn hero-card hvr-float-shadow"
                >
                    <i class="fas fav-icon fa-heart" v-if="favs[hero.id] !== undefined"></i>
                    <v-img class="picture"

                           :src="hero.thumbnail.path+'/standard_fantastic.'+hero.thumbnail.extension"
                    >
                        <v-card-title class="name-zone">
                           <div class="name bold">
                               {{getFirstName(hero.name)}}
                           </div>
                            <div class="subname bold" v-if="getSecondName(hero.name) !=''">
                                ({{getSecondName(hero.name)}})
                            </div>
                        </v-card-title>
                    </v-img>
                </v-card>

            </v-col>
        </v-row>

        <v-row>
        <div class="pagination">

            <a href="#" @click.stop="previousPage" v-if="page>1" class="link previous-page"><i class="fas fa-angle-left"></i></a>
            <a href="#" @click.stop="nextPage"  class="link next-page"><i class="fas fa-angle-right"></i></a>
        </div>
        </v-row>

        <v-dialog v-model="heroModal"
                  class="hero-modal"
                  max-width="1000"
                  transition="fab-transition"
        >
            <heroModal></heroModal>
        </v-dialog>
    </v-container>


</template>

<script>
    import HeroModal from '@/components/HeroModal.vue'
export default {
  name: 'HeroesList',
    components :{
      HeroModal
    },
  data: function() {
      return {
          heroModal : false,
          page : 1,
      }
  },
   methods:{
      selectHero(hero){
          this.$store.commit('selectHero', hero);
          this.heroModal = true;
      },
       getFirstName(fullName){
           return fullName.split("(")[0];
       },
       getSecondName(fullName){
           let subNameRegex = /\(([^)]+)\)/,
               match = subNameRegex.exec(fullName);

           if(match){
               return match[1];
           }else{
               return ''
           }
       },
       previousPage(){
          this.page--;
       },
       nextPage() {
          this.page++;
           if(this.heroesList.results.length < 18*this.page){
               this.$axios.get(process.env.VUE_APP_API_URL
                   +"/v1/public/characters?apikey="
                   +process.env.VUE_APP_API_PUBLIC_KEY
                   +"&limit="+process.env.VUE_APP_API_LIMIT+"&offset="+process.env.VUE_APP_API_LIMIT*(this.page-1)
               ).then(response =>{
                   this.$store.commit('nextPage', response.data.data.results);
               });
           }
           console.log(this.page);
       },
   },
    computed: {
        heroesList () {
            return this.$store.state.heroesList
        },
        favs () {
            return this.$store.state.favorites
        }
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


    .hero-card{
        &:hover{
            cursor: pointer;
            .picture{
                opacity: 1;
            }
         }
    }

    .fav-icon{
        z-index: 1;
        color: red;
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .picture{
        opacity: 0.65;
        transition: opacity 0.35s;
    }
    .hero-modal{
        max-height: 70%;
    }

    .name-zone{
        color: white;
        display: block;
        bottom:0;
        position: absolute;
        left: 0;
        right: 0;

        padding:10px;
     div{
         text-align: center;
         word-break: normal;
         line-height: 1;
         -webkit-text-stroke: 1px black;
         color: white;

     }
    }

    .name{
        font-size: 0.8em;
        text-shadow:
                3px 3px 0 #000,
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000;
    }
    .subname{
        font-size: 0.6em;
    }

        .pagination{

            .link{
                position: fixed;
                top:50%;
                margin-top:-    1em;
                font-size: 4em;
                color:#5a5a5a52 ;

                &.next-page{
                  right: 50px;
                }

                &.previous-page{
                    left: 50px;
                }

                &:hover{
                    color: #5a5a5a ;
                }
            }
        }



</style>
