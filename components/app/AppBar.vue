<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon aria-label="menu" @click="nav = !nav" />
    <v-spacer />
    <v-fade-transition>
      <v-btn
        v-show="$route.path !== '/' || IndexShowLogo"
        text
        class="text-none text-h5"
        href="/"
        @click.stop.prevent="$router.push('/')"
      >
        <v-avatar left>
          <img :src="require('~/static/icon.png')" alt="site logo" />
        </v-avatar>
        <v-badge :content="version" inline>
          <code>zisu.dev</code>
        </v-badge>
      </v-btn>
    </v-fade-transition>
    <v-spacer />
    <user-indicator />
    <v-divider vertical inset />
    <v-btn icon aria-label="Settings" @click="settings = !settings">
      <v-icon>{{ mdiCog }}</v-icon>
    </v-btn>
    <v-btn
      icon
      href="https://github.com/thezzisu/zisu.dev"
      target="_blank"
      rel="noopener"
    >
      <v-icon>{{ mdiGithub }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCog, mdiGithub } from '@mdi/js'
import { sync } from 'vuex-pathify'
import UserIndicator from '~/components/app/AppBarUserIndicator.vue'

export default Vue.extend({
  name: 'App',
  components: { UserIndicator },
  data() {
    return {
      version: BUILD.version,
      drawer: null,
      mdiCog,
      mdiGithub
    }
  },
  computed: {
    nav: sync('drawers@nav'),
    settings: sync('drawers@settings'),
    IndexShowLogo: sync('bar@IndexShowLogo')
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
