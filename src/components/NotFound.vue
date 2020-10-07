<template>
  <v-container
    fluid
    class="not-found pt-15"
  >
    <v-row>
      <div class="not-found__details">
        <h1
          class="not-found__title"
        >
          {{ $t('NOT_FOUND.CODE') }}
        </h1>
        <p
          class="not-found__text"
        >
          {{ $t('NOT_FOUND.TEXT') }}
        </p>
      </div>
    </v-row>
    <v-row>
      <v-img
        class="not-found__image"
        src="@/assets/404.png"
      />
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'NotFound'
}
</script>
