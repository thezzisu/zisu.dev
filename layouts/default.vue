<template>
  <v-app :class="{ acrylic }">
    <app-bar />
    <app-nav />
    <app-settings-drawer />
    <v-main>
      <nuxt />
    </v-main>
    <app-speed-dial />
    <app-footer />
    <app-bg />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { get, sync } from 'vuex-pathify'
import AppBar from '~/components/app/AppBar.vue'
import AppFooter from '~/components/app/AppFooter.vue'
import AppBg from '~/components/app/AppBg.vue'
import AppNav from '~/components/app/AppNav.vue'
import AppSettingsDrawer from '~/components/app/AppSettingsDrawer.vue'
import AppSpeedDial from '~/components/app/AppSpeedDial.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppBg,
    AppBar,
    AppFooter,
    AppNav,
    AppSettingsDrawer,
    AppSpeedDial
  },
  data() {
    return {
      drawer: null
    }
  },
  computed: {
    theme: get('theme'),
    acrylic: get('local@acrylic'),
    nav: sync('drawers@nav')
  },
  watch: {
    theme: {
      immediate: true,
      handler(val) {
        this.$vuetify.theme.dark = val === 1
      }
    }
  }
})
</script>
