<template>
<div>
  <v-card
  >
    <v-row no-gutters>
      <v-col cols="4">
        <v-img class="picture"
               width="300"
               :src="hero.thumbnail.path+'/portrait_uncanny.'+hero.thumbnail.extension"
        ></v-img>

      </v-col>
      <v-col cols="8" class="details">
        <a class="fav-btn" href="#" @click.stop="switchFav(hero)">
          <i class=" fav-icon fas fa-heart animate__animated" :class="{'animate__rubberBand favorite ': isFav}"></i></a>
          <div class="name bold">{{getFirstName(hero.name)}}</div>
        <div v-if="getSecondName(hero.name)!=''" class="subname bold italic"> ({{getSecondName(hero.name)}})</div>
          <div class="description">
            <span v-if="hero.description != ''">
              {{hero.description}}
            </span>
            <span v-else>
              Pas de biographie disponible.
            </span>
          </div>
        <v-card-actions class="actions-zone">
          <v-btn
                  color="primary"
                  text
          >
            Editer
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>


  </v-card>
</div>
</template>

<script>
  export default {
    name: 'HeroModal',
    data: function(){
      return{
        isFav : this.$store.state.favorites[this.$store.state.selectedHero.id] !== undefined,
      }
    },
    computed: {
      hero () {
        return this.$store.state.selectedHero
      },
      favorites(){
        return this.$store.state.favorites
      }
    },
    methods:{
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
      switchFav(hero){
        if(this.$store.state.favorites[hero.id] === undefined){
          this.$store.commit('addFav',hero);
        }else{
          this.$store.commit('removeFav', hero);
        }
        this.isFav = !this.isFav;
      },
    },
    beforeUpdate() {
      this.isFav = this.$store.state.favorites[this.$store.state.selectedHero.id];
    }


  }
</script>

<style lang="scss" scoped>
  .hero-details{
    overflow: hidden;
  }

  .fav-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 2.5em;

    .fav-icon {
      color: grey;
      transition: color 0.6s;

      &.favorite {
        color: red;
      }
    }
  }

  .picture{
    float: left;
  }

  .details{
    float: right ;
    padding:10px;
    padding-right: 65px;
   }

  .name {
    font-size: 3.3em;
    line-height: 1;
  }

  .subname{
    font-size: 1.1em;
    line-height: 1;
  }

  .description{
    margin-top: 20px;
    font-size: 0.9em;
  }

</style>
