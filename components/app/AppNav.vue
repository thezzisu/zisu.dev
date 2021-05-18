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
