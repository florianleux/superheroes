<template>
  <v-dialog
      class="create-modal"
      persistent
      max-width="1000"
      transition="fab-transition"
      value="true"
      @click:outside.prevent="closeModal"
  >
    <v-card v-on:keyup.enter="save">
      <v-row no-gutters>
        <v-col cols="4">
          <v-img
              lazy-src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg"
              class="picture"
              rel="prefetch"
              aspect-ratio="0.666666"
              width="320"
              :src="pictureURL"
          >
            <div class="triangle-modal"/>
          </v-img>
        </v-col>
        <v-col
            cols="8"
            class="details"
        >
          <input
              v-model="createdHero.name"
              placeholder="Votre héros"
              class="name bold editing"
              type="text"
          />
          <textarea
              placeholder="Ajoutez une description à votre héros ici"
              v-model="createdHero.description"
              class="description editing"
          />
          <label for="urlInput">
            URL de l'image
            <input
                v-model="pictureURL"
                id="urlInput"
                class="path editing"
                placeholder="http://monsite.com/mon-image.jpg"
                type="text"
            />
          </label>
          <v-card-actions class="actions-zone d-flex flex-row-reverse">
            <v-btn
                color="primary"
                text
                @click="save"
                :disabled="createdHero.name === ''"
            >
              {{ $t('HERO_MODAL.SAVE') }}
            </v-btn>
            <v-btn
                color="error"
                text
                @click="closeModal"
            >
              {{ $t('HERO_MODAL.CANCEL') }}
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'HeroModal',
  props: {
    createModal: {type: Boolean, default: false}
  },
  data: function () {
    return {
      createdHero: {
        id: 'U' + Date.now(),
        name: '',
        description: '',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
          extension: 'jpg'
        }
      }
    }
  },
  // TODO Utiliser les MapStates ?
  computed: {
    pictureURL: {
      get() {
        return this.createdHero.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ? this.createdHero.thumbnail.path + '/portrait_uncanny.' + this.createdHero.thumbnail.extension : this.createdHero.thumbnail.path + '.' + this.createdHero.thumbnail.extension
      },
      set(value) {
        let pathRegex = /.+(?=[.])/ms,
            extensionRegex = /.*\.(\w{3,})$/ms;

        this.createdHero.thumbnail.path = value.match(pathRegex) ? value.match(pathRegex)[0] : '';
        this.createdHero.thumbnail.extension = value.replace(extensionRegex, '$1') ? value.replace(extensionRegex, '$1') : '';
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    save() {
      this.$emit('create-hero', this.createdHero);
      this.closeModal();
    }
  }
}
</script>
<style
    lang="scss"
    scoped
>
.hero-details {
  overflow: hidden;
}

.fav-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2em;

  .fav-icon {
    color: grey;
    transition: color 0.6s;

    &.favorite {
      color: red;
    }
  }
}

.triangle-modal {
  z-index: 1000;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 50px 480px 0;
  border-color: transparent #FFF transparent transparent;
  position: absolute;
  right: 0;
}

.picture {
  float: left;
  outline: none;

  &.editing {
    filter: grayscale(0.8);
    border: none;
  }
}

.details {
  float: right;
  padding: 10px 65px 10px 0;
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
  min-height: 18px;
}

.reset-snackbar {
  text-align: center;
}

.description {
  margin-top: 20px;
  font-size: 0.9em;
  height: 120px;
  width: 100%;
  resize: none;
}

label {
  margin-top: 35px;
  font-size: 0.7em;
  display: block;
}

.path {
  margin-top: 20px;
  font-size: 1.3em;
  margin: 0;
}
</style>
