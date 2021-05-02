<template>
  <div :style="{ zIndex }">
    <v-img :src="bg" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppBg',
  computed: {
    scope() {
      return this.$route.path.split('/')[1] || 'index'
    },
    bg() {
      return this.$vuetify.theme.dark
        ? process.env.BG_DARK
        : process.env.BG_LIGHT
    },
    zIndex() {
      return this.$store.state.zen ? 6 : -1
    }
  }
})
</script>

<style scoped>
div {
  position: fixed;
  width: 100%;
  height: 100%;
  transition: 0.1s;
  background-position: center center;
  background-image: linear-gradient(-45deg, rgb(34, 76, 152) 10%, transparent),
    repeating-linear-gradient(
      0deg,
      rgba(34, 76, 152, 1) 0px,
      rgba(31, 48, 94, 0.6) 50px,
      transparent 50px,
      transparent 100px
    ),
    repeating-linear-gradient(
      -90deg,
      rgba(34, 76, 152, 0.4) 0px,
      rgba(31, 48, 94, 0.5) 50px,
      transparent 50px,
      transparent 100px
    );
}
</style>
