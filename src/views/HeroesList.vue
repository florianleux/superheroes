<template>
    <v-container fluid>
        <v-row>
            <v-col cols="2" v-for="hero in heroesList" :key="hero.id">
                <v-card @click.stop="selectHero(hero)" :title="hero.name" class="hero-card hvr-float-shadow"
                >
                    <v-img class="picture"

                           :src="hero.thumbnail.path+'/standard_fantastic.'+hero.thumbnail.extension"
                    >
                        <v-card-title class="name">
                            {{hero.name}}
                        </v-card-title>
                    </v-img>
                </v-card>

            </v-col>
        </v-row>
        <v-dialog v-model="heroModal">
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
      }
  },
   methods:{
      selectHero(hero){
          this.$store.commit('selectHero', hero);
          this.heroModal = true;
      }
   },
    computed: {
        heroesList () {
            return this.$store.state.heroesList
        }
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .hero-card{
        &:hover{
            cursor: pointer;
         }
    }

    .name{
        color: white;
        text-align: center;
        display: block;
        font-family: "Heroes Legend";
        font-size: 0.8em;
        bottom:0;
        position: absolute;
        left: 0;
        right: 0;
        word-break: normal;

        -webkit-text-stroke: 1px black;
        color: white;
        text-shadow:
                3px 3px 0 #000,
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000;
    }
</style>
