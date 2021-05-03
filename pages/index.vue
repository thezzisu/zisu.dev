<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <v-card ref="next" class="site-title-card">
          <v-card-title>
            <v-spacer />
            <div>
              <v-avatar size="128" class="site-title-logo">
                <img :src="require('~/static/icon.png')" />
              </v-avatar>
            </div>
            <v-spacer />
          </v-card-title>
          <v-card-text class="text-center text-h3 text--primary">
            <v-badge :content="version">
              <code>zisu.dev</code>
            </v-badge>
          </v-card-text>
          <v-divider />
          <v-card-text class="text-center motto">
            <code>{{ motto }}</code>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <v-card ref="next">
          <v-card-title>Next</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item v-for="(link, i) in links" :key="i" v-bind="link.link">
              <v-list-item-avatar tile size="24">
                <v-icon>{{ link.icon }}</v-icon>
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
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <contact-card />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <recent-posts />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiFormatListText, mdiArrowDown } from '@mdi/js'
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
        }
      ],

      mdiArrowDown
    }
  },
  head() {
    return {
      title: 'Index'
    }
  },
  computed: {
    motto(): string {
      if (process.server) return ''
      return this.$vuetify.theme.dark
        ? btoa('Goodbye world')
        : 'Code is philosophy'
    }
  },
  created() {
    this.$store.commit('scope:update', 'index')
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
}
</style>
