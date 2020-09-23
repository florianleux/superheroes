<template>
    <div>
      <v-card>
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
            <input :value="hero.name" v-if="editMode" class="name bold editing" type="text">
          <div v-else>
            <div class="name bold">{{getFirstName(hero.name)}}</div>
            <div v-if="getSecondName(hero.name)!=''" class="subname bold italic"> ({{getSecondName(hero.name)}})</div>
          </div>
            <textarea :value="hero.description" v-if="editMode" class="description editing"/>
            <div v-else class="description">
            <span v-if="hero.description != ''">
              {{hero.description}}
            </span>
              <span v-else>
              Pas de biographie disponible.
            </span>
            </div>

            <v-card-actions class="actions-zone d-flex flex-row-reverse">
              <v-btn
                      v-if="!editMode"
                      color="primary"
                      class="edit-btn"
                      text
                      @click="editMode = true"
              >
                Editer
              </v-btn>
              <v-btn
                  v-if="editMode"
                  color="primary"
                  text
                  @click="editMode = false"
              >
                Sauvegarder
              </v-btn>
              <v-btn
                      v-if="editMode"
                      color="error"
                      text
                      @click="editMode = false"
              >
                Annuler
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
        editMode : false
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
    position: relative;
   }

  .actions-zone{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    .edit-btn{
      float: right;
    }
  }

  .name {
    font-size: 3.3em;
    line-height: 1;
    padding-top :10px;
  }

  .editing{
    color: gray;
    width: 100%;
    border-bottom: 2px solid #c6c6c6;
    padding:0;
    &:focus{
      outline: none;
    }
  }

  .subname{
    font-size: 1.1em;
    line-height: 1;
  }

  .description{
    margin-top: 20px;
    font-size: 0.9em;
    height: 200px;
    width: 100%;
    resize: none;
  }

</style>
