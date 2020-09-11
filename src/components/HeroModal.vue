<template>
<div>
  <v-card
  >
    <v-row no-gutters>
      <v-col cols="4">
        <v-img class="picture"
               width="300"
               :src="hero.thumbnail.path+'/portrait_uncanny.'+hero.thumbnail.extension"
        />
      </v-col>
      <v-col cols="8" class="details">

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
      </v-col>
    </v-row>

<!--    <v-card-actions>-->
<!--      <v-spacer></v-spacer>-->
<!--&lt;!&ndash;      <v-btn&ndash;&gt;-->
<!--&lt;!&ndash;              color="primary"&ndash;&gt;-->
<!--&lt;!&ndash;              text&ndash;&gt;-->
<!--&lt;!&ndash;              @click="dialog = false"&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        I accept&ndash;&gt;-->
<!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
<!--    </v-card-actions>-->
  </v-card>
</div>
</template>

<script>
  export default {
    name: 'HeroModal',
    data: function(){
      return{

      }
    },
    computed: {
      hero () {
        return this.$store.state.selectedHero
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

      }
    }


  }
</script>

<style lang="scss" scoped>
  .hero-details{
    overflow: hidden;
  }

  .picture{
    float: left;
  }

  .details{
    float: right ;
    padding:10px;
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
