<template>
  <v-dialog
    class="hero-modal"
    persistent
    max-width="1000"
    transition="fab-transition"
    value="true"
    @click:outside.prevent="closeModal"
  >
    <v-card @keyup.enter="save">
      <v-row no-gutters>
        <v-col cols="4">
          <v-img
            lazy-src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg"
            class="hero-modal__picture"
            :class="{'hero-modal__picture--editing': editMode}"
            rel="prefetch"
            aspect-ratio="0.666666"
            width="320"
            :src="pictureURL"
          >
            <div class="hero-modal__triangle" />
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  :size="100"
                  :width="7"
                  color="grey lighten-1"
                />
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col
          cols="8"
          class="hero-modal__details"
        >
          <a
            class="hero-modal__fav-btn"
            href="#"
            :title="favoriteBtnTitle"
            @click.prevent="switchFavorite(selectedHero.id)"
          >
            <i
              class=" hero-modal__fav-icon fas fa-heart animate__animated"
              :class="{'animate__rubberBand hero-modal__fav-icon--favorite ': isFav(selectedHero.id)}"
            />
          </a>

          <form v-if="editMode">
            <input
              v-if="editMode"
              v-model="editedHero.name"
              class="hero-modal__name hero-modal__name--editing"
              type="text"
            >
            <textarea
              v-if="editMode"
              v-model="editedHero.description"
              :placeholder="$t('HERO_MODAL.DESCRIPTION_PLACEHOLDER', {hero: selectedHero.name})"
              class="hero-modal__description hero-modal__description--editing"
            />

            <label
              class="hero-modal__label"
              for="urlInput"
            >
              URL de l'image
              <input
                id="urlInput"
                v-model="pictureURL"
                class="hero-modal__path"
                type="text"
              >
            </label>
          </form>
          <div v-else>
            <div class="hero-modal__name  hero-modal__name--first ">
              {{ selectedHero.name | firstName }}
            </div>
            <div
              class="hero-modal__name  hero-modal__name--second"
            >
              {{ selectedHero.name | secondName }}
            </div>
            <div
              class="hero-modal__description"
            >
              <span v-if="selectedHero.description">
                {{ selectedHero.description }}
              </span>
              <span v-else>
                {{ $t('HERO_MODAL.NO_DESCRIPTION', {hero: selectedHero.name}) }}
              </span>
            </div>
          </div>

          <v-card-actions class="hero-modal__actions d-flex flex-row-reverse">
            <v-btn
              v-if="!editMode"
              color="primary"
              class="edit-btn"
              text
              @click="switchEdit(true)"
            >
              {{ $t('HERO_MODAL.EDIT') }}
            </v-btn>
            <v-btn
              v-if="!editMode && isEdited"
              color="primary"
              class="edit-btn"
              text
              @click="reset"
            >
              {{ $t('HERO_MODAL.RESET') }}
            </v-btn>
            <v-btn
              v-if="!editMode"
              color="error"
              text
              @click="deleteHero(selectedHero.id)"
            >
              {{ $t('HERO_MODAL.DELETE') }}
            </v-btn>
            <v-btn
              v-if="editMode"
              color="primary"
              text
              @click="save"
            >
              {{ $t('HERO_MODAL.SAVE') }}
            </v-btn>
            <v-btn
              v-if="editMode"
              color="error"
              text
              @click="switchEdit(false)"
            >
              {{ $t('HERO_MODAL.CANCEL') }}
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar
      v-model="snackbar.on"
      :color="snackbar.type"
      class="hero-modal__snackbar"
      timeout="1500"
      outlined
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-dialog>
</template>
<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'HeroModal',
  props: {
    selectedHero: {type: Object, default: null},
    heroModal: {type: Boolean, default: false}
  },
  data: function () {
    return {
      editMode: false,
      editedHero: this.$cloneDeep(this.selectedHero),
      snackbar: {
        on: false,
        message: '',
        type: ''
      },
    }
  },
  computed: {
    ...mapState('favorites', [
      'favoritesList'
    ]),
    favoriteBtnTitle: function () {
      return this.isFav(this.selectedHero.id) ? this.$t("HERO_MODAL.REMOVE_FAVORITE", {hero: this.selectedHero.name}) : this.$t("HERO_MODAL.ADD_FAVORITE", {hero: this.selectedHero.name});
    },
    isEdited: function () {
      return this.selectedHero.name !== this.selectedHero.initialValue.name ||
          this.selectedHero.description !== this.selectedHero.initialValue.description ||
          this.selectedHero.thumbnail.path !== this.selectedHero.initialValue.thumbnail.path ||
          this.selectedHero.thumbnail.extension !== this.selectedHero.initialValue.thumbnail.extension
    },
    pictureURL: {
      get() {
        if (this.editedHero.thumbnail.path === this.selectedHero.initialValue.thumbnail.path) {
          return this.editedHero.thumbnail.path + '/portrait_uncanny.' + this.editedHero.thumbnail.extension
        } else {
          return this.editedHero.thumbnail.extension === '' ? this.editedHero.thumbnail.path : this.editedHero.thumbnail.path + '.' + this.editedHero.thumbnail.extension
        }
      },
      set(value) {
        let extensionRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

        this.editedHero.thumbnail.path = value.match(extensionRegex) ? value.replace(extensionRegex, '') : value;
        this.editedHero.thumbnail.extension = value.match(extensionRegex) ? value.match(extensionRegex)[1] : '';
      }
    }
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
      if (this.editMode) {
        let confirmClose = confirm(this.$t("HERO_MODAL.CONFIRM_QUIT_MESSAGE"))
        if (confirmClose == true) {
          this.switchEdit(false);
          this.editMode = false;
          this.$emit('close-modal');
        }
      } else {
        this.$emit('close-modal');
      }
    },
    addNotification(param) {
      this.snackbar.on = true;
      this.snackbar.text = param === 'error' ? this.$t("HERO_MODAL.NOTIFICATION_RESET_ERROR") : this.$t("HERO_MODAL.NOTIFICATION_RESET_SUCCESS");
      this.snackbar.type = param;
    },
    switchEdit(mode) {
      this.editedHero = this.$cloneDeep(this.selectedHero);
      this.editMode = mode;
    },
    reset() {
      this.$axios.get(this.$apiURL
          + "/v1/public/characters/" + this.selectedHero.id + "?apikey="
          + this.$apiPublicKey
      ).then(response => {
        this.addNotification('success');
        this.$emit('reset-hero', response.data.data.results[0]);
      }).catch(() => {
        this.addNotification('error')
      })
    },
    save() {
      this.$emit('update-hero', this.editedHero);
      this.editMode = false;
    },
    deleteHero(heroId) {
      let confirmDelete = confirm(this.$t("HERO_MODAL.CONFIRM_DELETE_MESSAGE", {hero: this.selectedHero.name}))
      if (confirmDelete == true) {
        this.$emit('delete-hero', heroId);
        this.$emit('close-modal');
      }
    }
  }
}
</script>
