<template>
  <v-dialog
    class="create-modal"
    persistent
    max-width="1000"
    transition="fab-transition"
    value="true"
    @click:outside.prevent="closeModal"
    @keydown.esc="closeModal"
  >
    <v-card @keyup.enter="save">
      <v-row no-gutters>
        <v-col cols="4">
          <v-img
            class="create-modal__picture"
            rel="prefetch"
            aspect-ratio="0.666666"
            width="320"
            :src="pictureURL"
          >
            <div class="create-modal__triangle" />
          </v-img>
        </v-col>
        <v-col
          cols="8"
          class="create-modal__details"
        >
          <input
            v-model="createdHero.name"
            :placeholder="$t('CREATE_MODAL.NEW_HERO_NAME_PLACEHOLDER')"
            class="create-modal__name"
            type="text"
          >
          <textarea
            v-model="createdHero.description"
            :placeholder="$t('CREATE_MODAL.NEW_HERO_DESCRIPTION_PLACEHOLDER')"
            class="create-modal__description"
          />
          <label
            class="create-modal__label"
            for="urlInput"
          >
            {{ $t('HERO_MODAL.PICTURE_URL') }}
            <input
              id="urlInput"
              v-model="pictureURL"
              :placeholder="$t('CREATE_MODAL.NEW_HERO_URL_PLACEHOLDER')"
              class="create-modal__path"
              type="text"
            >
          </label>
          <v-card-actions class="create-modal__actions d-flex flex-row-reverse">
            <v-btn
              color="primary"
              text
              :disabled="createdHero.name === ''"
              @click="save"
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
  name: 'NewHeroModal',
  props: {
    createModal: {type: Boolean, default: false}
  },
  data() {
    return {
      createdHero: {
        id: 'U' + Date.now(),
        name: '',
        description: '',
        thumbnail: {
          path: '',
          extension: ''
        }
      }
    }
  },
  computed: {
    pictureURL: {
      get() {
        return this.createdHero.thumbnail.extension === '' ? this.createdHero.thumbnail.path : this.createdHero.thumbnail.path + '.' + this.createdHero.thumbnail.extension
      },
      set(value) {
        let extensionRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

        this.createdHero.thumbnail.path = value.match(extensionRegex) ? value.replace(extensionRegex, '') : value;
        this.createdHero.thumbnail.extension = value.match(extensionRegex) ? value.match(extensionRegex)[1] : '';
      }
    }
  },
  methods: {
    /**
     * @Method to close the modal, emiting event to the parent component
     */
    closeModal() {
      this.$emit('close-modal');
    },
    /**
     * @Method to save the new hero, add a default picture if none has been added
     */
    save() {
      if (this.createdHero.thumbnail.path === "" || this.createdHero.thumbnail.extension === "") {
        this.createdHero.thumbnail = {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
          extension: 'jpg'
        }
      }
      this.$emit('create-hero', this.createdHero);
      this.closeModal();
    }
  }
}
</script>
