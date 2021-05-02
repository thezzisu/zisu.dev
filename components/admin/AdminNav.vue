<template>
  <v-list-group>
    <template #activator>
      <v-list-item-avatar tile size="24">
        <v-icon>{{ mdiHammerWrench }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-title class="text-overline">Admin</v-list-item-title>
    </template>
    <v-list-item
      v-for="(link, i) of links"
      :key="i"
      :to="'/admin' + link.to"
      :exact="link.exact"
      nuxt
    >
      <v-list-item-avatar tile size="24">
        <v-icon>{{ link.icon }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-overline" v-text="link.text" />
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mdiAccount,
  mdiCog,
  mdiHammerWrench,
  mdiPost,
  mdiTag,
  mdiViewDashboard
} from '@mdi/js'

export default Vue.extend({
  name: 'AdminNav',
  data() {
    return {
      links: [
        { to: '/', icon: mdiViewDashboard, text: 'Dashboard', exact: true },
        { to: '/post', icon: mdiPost, text: 'Posts' },
        { to: '/tag', icon: mdiTag, text: 'Tags' },
        { to: '/user', icon: mdiAccount, text: 'Users' },
        { to: '/meta', icon: mdiCog, text: 'Metas' }
      ],
      mdiHammerWrench
    }
  }
})
</script>