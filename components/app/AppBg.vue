<template>
  <div :style="{ zIndex }" class="bg"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppBg',
  computed: {
    zIndex() {
      return this.$store.state.zen ? 6 : -1
    }
  }
})
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  transition: 0.1s;
  background-position: center center;
  background-size: cover;
}

.theme--light .bg {
  background-image: url(https://statically.zzisu.dev/defined/bg_light);
}

.theme--dark .bg {
  background-image: url(https://statically.zzisu.dev/defined/bg_dark);
}

.credits {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
