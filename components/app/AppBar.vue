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
        @click.stop.prevent="onLogoClick"
      >
        <v-avatar left>
          <img :src="require('~/static/icon.png')" alt="site logo" />
        </v-avatar>
        <template v-if="!$vuetify.breakpoint.xs">
          <v-badge :content="version" inline>
            <code>zisu.dev</code>
          </v-badge>
        </template>
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
  },
  methods: {
    onLogoClick() {
      if (this.$route.path === '/') {
        this.$vuetify.goTo(0)
      } else {
        this.$router.push('/')
      }
    }
  }
})
</script>
