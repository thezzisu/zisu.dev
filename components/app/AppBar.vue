<template>
  <v-app-bar app>
    <v-app-bar-nav-icon aria-label="menu" @click="$emit('change', !value)" />
    <v-btn
      text
      x-large
      class="text-none text-h5"
      href="/"
      @click.stop.prevent="$router.push('/')"
    >
      <code>zisu.dev</code>
    </v-btn>
    <v-spacer />
    <user-indicator />
    <v-divider vertical inset />
    <v-btn icon aria-label="Settings" @click="settings = !settings">
      <v-icon>{{ mdiCog }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCog } from '@mdi/js'
import { sync } from 'vuex-pathify'
import UserIndicator from '~/components/app/AppBarUserIndicator.vue'

export default Vue.extend({
  name: 'App',
  components: { UserIndicator },
  model: {
    prop: 'value',
    event: 'change'
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      drawer: null,
      mdiCog
    }
  },
  computed: {
    settings: sync('drawers@settings')
  }
})
</script>

<style>
.theme--dark .site-title {
  color: #fff;
}
.theme--light .site-title {
  color: #000;
}
</style>
