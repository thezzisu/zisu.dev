<template>
  <v-navigation-drawer v-model="nav" app>
    <v-list nav dense>
      <v-list-item to="/">
        <v-list-item-avatar tile size="24">
          <v-img :src="require('~/assets/logo.svg')" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-monospace">Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(link, i) of links" :key="i" v-bind="link.link" nuxt>
        <v-list-item-avatar tile size="24">
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-monospace" v-text="link.text" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mdiFormatListText,
  mdiInformationOutline,
  mdiLink,
  mdiRocketLaunch,
  mdiTrainVariant,
  mdiUpdate
} from '@mdi/js'
import { sync } from 'vuex-pathify'
import { svgDev2Dev } from '~/utils/dev2dev'

export default Vue.extend({
  name: 'AppNav',
  data() {
    return {
      links: [
        { link: { to: '/post' }, icon: mdiFormatListText, text: 'Blog' },
        { link: { to: '/about' }, icon: mdiInformationOutline, text: 'About' },
        { link: { to: '/changelog' }, icon: mdiUpdate, text: 'Changelog' },
        { link: { to: '/build' }, icon: mdiRocketLaunch, text: 'Build Info' },
        { link: { to: '/link' }, icon: mdiLink, text: 'Links' },
        {
          link: { href: 'https://dev2dev.zisu.dev', target: '_blank' },
          icon: svgDev2Dev,
          text: 'Dev2Dev'
        },
        {
          link: { href: 'https://travellings.link', target: '_blank' },
          icon: mdiTrainVariant,
          text: 'Travelling'
        }
      ]
    }
  },
  computed: {
    nav: sync('drawers@nav')
  }
})
</script>
