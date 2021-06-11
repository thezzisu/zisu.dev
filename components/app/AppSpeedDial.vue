<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      :style="{
        marginBottom: `${btnMarginBottom}px`
      }"
      bottom
      color="primary"
      fab
      fixed
      right
      style="z-index: 6"
      @click="toTop"
    >
      <v-icon>{{ mdiArrowCollapseUp }}</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiArrowCollapseUp } from '@mdi/js'
import { get, sync } from 'vuex-pathify'

export default Vue.extend({
  name: 'App',
  data() {
    return {
      showFab: false,
      mdiArrowCollapseUp
    }
  },
  computed: {
    fab: sync<boolean>('fab'),
    footerOffset: get<number>('footer@offset'),
    btnMarginBottom() {
      return Math.max(this.footerOffset, 0)
    }
  },
  methods: {
    toTop() {
      this.$vuetify.goTo(0)
    },
    onScroll() {
      const top = window.pageYOffset || document.documentElement.offsetTop || 0
      this.fab = top > 128
    }
  }
})
</script>
