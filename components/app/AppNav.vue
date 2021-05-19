<template>
  <v-list nav dense>
    <v-list-item v-for="(link, i) of links" :key="i" v-bind="link.link" nuxt>
      <v-list-item-avatar tile size="24">
        <v-icon>{{ link.icon }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-monospace" v-text="link.text" />
      </v-list-item-content>
    </v-list-item>
    <template v-if="isAdmin">
      <v-divider />
      <admin-nav />
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import {
  mdiFormatListText,
  mdiHome,
  mdiInformationOutline,
  mdiLink,
  mdiRocketLaunch,
  mdiTrainVariant,
  mdiUpdate
} from '@mdi/js'
import AdminNav from '~/components/admin/AdminNav.vue'

const dev2dev = "M11.84,19V16.41l2.34-.36v-.28H1V13.59h15.9l2.69-1.5v-.21L17,10.38H1V8.2H14.23V8l-2.39-.38V5L23,11.27V12.7Z"

export default Vue.extend({
  name: 'AppNav',
  components: { AdminNav },
  data() {
    return {
      links: [
        { link: { to: '/' }, icon: mdiHome, text: 'Home' },
        { link: { to: '/post' }, icon: mdiFormatListText, text: 'Blog' },
        { link: { to: '/about' }, icon: mdiInformationOutline, text: 'About' },
        { link: { to: '/changelog' }, icon: mdiUpdate, text: 'Changelog' },
        { link: { to: '/build' }, icon: mdiRocketLaunch, text: 'Build Info' },
        { link: { to: '/link' }, icon: mdiLink, text: 'Links' },
        {
          link: { href: 'https://dev2dev.pages.dev', target: '_blank' },
          icon: dev2dev,
          text: 'Dev2Dev'
        },
        {
          link: { href: 'https://travellings.pages.dev', target: '_blank' },
          icon: mdiTrainVariant,
          text: 'Travelling'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  }
})
</script>
