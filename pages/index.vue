<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <v-card>
          <v-alert type="warning">
            Zisu.dev is currently under reconstruction. All API services are stopped.
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <v-card v-intersect="onIntersect">
          <v-card-title class="justify-center">
            <v-avatar size="128">
              <img :src="require('~/static/icon.png')" alt="site logo" />
            </v-avatar>
            <div class="text-center text-h3 flex-fill-rest">
              <v-badge :content="version">
                <code>zisu.dev</code>
              </v-badge>
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-center motto">
            <code>{{ motto }}</code>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <contact-card />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <v-card>
          <v-card-title>Next</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item v-for="(link, i) in links" :key="i" v-bind="link.link">
              <v-list-item-avatar tile size="32">
                <v-icon v-if="'icon' in link">{{ link.icon }}</v-icon>
                <img v-else :src="link.img" :alt="link.title" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ link.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiFormatListText, mdiArrowDown, mdiTrafficLight } from '@mdi/js'
import RecentPosts from '~/components/post/RecentPosts.vue'
import ContactCard from '~/components/misc/ContactCard.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { RecentPosts, ContactCard },
  data() {
    return {
      version: BUILD.version,

      links: [
        {
          link: { to: '/post' },
          icon: mdiFormatListText,
          title: 'Blog',
          subtitle: 'zisu.dev blog'
        },
        {
          link: { href: 'https://status.zisu.dev', target: '_blank' },
          icon: mdiTrafficLight,
          title: 'Status Page',
          subtitle: 'zisu.dev status'
        }
      ],

      mdiArrowDown
    }
  },
  head: {
    title: 'Index'
  },
  computed: {
    motto() {
      return this.$vuetify.theme.dark ? 'ZGVsdXNpb24=' : 'Code is philosophy'
    }
  },
  methods: {
    onIntersect(entries: IntersectionObserverEntry[]) {
      this.$store.set('bar@IndexShowLogo', !entries[0].isIntersecting)
    }
  }
})
</script>

<style lang="scss" scoped>
$site-title-margin: 72px;

.site-title-card {
  margin-top: $site-title-margin;
}

.site-title-logo {
  margin-top: -$site-title-margin;
  border: 2px solid #7f8c8d;
  pointer-events: none;
  user-select: none;
}
</style>
