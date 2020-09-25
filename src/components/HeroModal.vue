<template>
  <v-dialog
      class="hero-modal"
      max-width="1000"
      transition="fab-transition"
      v-model="heroModal"
      @click:outside="closeModal"
  >
    <!--    TODO:Passer le selected hero en props plutot que dans le store-->
    <v-card>
      <v-row no-gutters>
        <v-col cols="4">
          <v-img class="picture"
                 width="300"
                 :src="selectedHero.thumbnail.path+'/portrait_uncanny.'+selectedHero.thumbnail.extension"
          ></v-img>

        </v-col>
        <v-col cols="8" class="details">
          <a class="fav-btn" href="#" @click.stop="switchFavorite(selectedHero.id)">
            <i class=" fav-icon fas fa-heart animate__animated" :class="{'animate__rubberBand favorite ': isFav(selectedHero.id)}"></i>
          </a>

          <input v-model="selectedHero.name" v-if="editMode" class="name bold editing" type="text">
          <div v-else>
            <div class="name bold">{{ getFirstName(selectedHero.name) }}</div>
            <div v-if="getSecondName(selectedHero.name)!=''" class="subname bold italic"> ({{ getSecondName(selectedHero.name) }})</div>
          </div>

          <textarea placeholder="Description du héros" v-model="selectedHero.description" v-if="editMode" class="description editing" />
          <div v-else class="description">
            <span v-if="selectedHero.description">
              {{ selectedHero.description }}
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
                @click="edit"
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
                @click="cancel"
            >
              Annuler
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'HeroModal',
  props: {
    selectedHero: Object,
    heroModal: {type: Boolean, default: false}
  },
  data: function () {
    return {
      editMode: false,
      bufferName: '',
      bufferDescription: ''
    }
  },
  // TODO Utiliser les MapStates ?
  computed: {
    ...mapState('favorites', [
      'favoritesList'
    ])
  },
  methods: {
    ...mapActions('favorites', [
      'addFavorite',
      'removeFavorite',
      'switchFavorite',
    ]),
    isFav(heroId) {
      return this.favoritesList.includes(heroId);
    },
    closeModal() {
      this.$emit('close-modal');
      if (this.editMode) {
        this.cancel();
        this.editMode = false;
      }
    },
    cancel() {
      this.selectedHero.name = this.bufferName;
      this.selectedHero.description = this.bufferDescription;
    },
    edit() {
      this.bufferName = this.selectedHero.name;
      this.bufferDescription = this.selectedHero.description;
      this.editMode = true;
    },
    //TODO utiliser un filter
    getFirstName(fullName) {
      return fullName.split("(")[0];
    },
    getSecondName(fullName) {
      let subNameRegex = /\(([^)]+)\)/,
          match = subNameRegex.exec(fullName);

      if (match) {
        return match[1];
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-details {
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

.picture {
  float: left;
}

.details {
  float: right;
  padding: 10px;
  padding-right: 65px;
  position: relative;
}

.actions-zone {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  .edit-btn {
    float: right;
  }
}

.name {
  font-size: 3.3em;
  line-height: 1;
  padding-top: 10px;
}

.editing {
  color: gray;
  width: 100%;
  border-bottom: 2px solid #C6C6C6;
  padding: 0;

  &:focus {
    outline: none;
  }
}

.subname {
  font-size: 1.1em;
  line-height: 1;
}

.description {
  margin-top: 20px;
  font-size: 0.9em;
  height: 200px;
  width: 100%;
  resize: none;
}
</style>
