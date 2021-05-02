<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <v-card ref="next" class="site-title-card">
          <v-card-title>
            <v-spacer />
            <div>
              <v-avatar size="128" class="site-title-logo">
                <v-img :src="require('~/static/icon.png')" />
              </v-avatar>
            </div>
            <v-spacer />
          </v-card-title>
          <v-card-text class="text-center text-h3">
            <code>zisu.dev</code>
          </v-card-text>
          <v-divider />
          <v-card-text class="text-center">
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
        <v-card>
          <v-card-title>Contact</v-card-title>
          <v-divider />
          <v-card-text>
            <template v-for="(s, i) in social">
              <a
                :key="i"
                :href="s.href"
                target="_blank"
                class="pr-1"
                rel="noreferrer"
              >
                <img :src="s.img" :alt="s.text" />
              </a>
            </template>
          </v-card-text>
          <v-divider />
          <v-card-text>
            <template v-for="(c, i) in contacts">
              <template v-if="c.href">
                <a
                  :key="i"
                  :href="c.href"
                  target="_blank"
                  class="pr-1"
                  rel="noreferrer"
                >
                  <img
                    :src="`https://img.shields.io/static/v1?label=&message=${c.text}&color=${c.color}&style=flat-square&logo=${c.icon}&logoColor=FFF`"
                    :alt="c.text"
                  />
                </a>
              </template>
              <template v-else>
                <img
                  :key="i"
                  :src="`https://img.shields.io/static/v1?label=${c.label}&message=${c.text}&color=${c.color}&style=flat-square&logo=${c.icon}&logoColor=FFF`"
                  :alt="c.text"
                  class="pr-1"
                />
              </template>
            </template>
          </v-card-text>
        </v-card>
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

export default Vue.extend({
  name: 'IndexPage',
  components: { RecentPosts },
  data() {
    return {
      links: [
        {
          link: { to: '/post' },
          icon: mdiFormatListText,
          title: 'Blog',
          subtitle: 'zisu.dev blog'
        }
      ],
      social: [
        {
          href: 'https://github.com/thezzisu',
          img:
            'https://img.shields.io/github/followers/thezzisu?label=Follow%20%40zzisu&style=social',
          text: 'GitHub'
        },
        {
          href: 'https://twitter.com/thezzisu',
          img: 'https://img.shields.io/twitter/follow/thezzisu?style=social',
          text: 'Twitter'
        }
      ],
      contacts: [
        {
          href: 'https://t.me/thezzisu',
          color: '2CA5E0',
          icon: 'telegram',
          text: 'thezzisu'
        },
        {
          href: 'mailto:thezzisu@gmail.com',
          color: 'blue',
          icon: 'gmail',
          text: 'thezzisu@gmail.com'
        },
        {
          href: 'https://space.bilibili.com/38430118',
          color: '00A1D6',
          icon: 'bilibili',
          text: 'thezzisu'
        },
        {
          href: 'https://www.zhihu.com/people/zhangzisu',
          color: '0084FF',
          icon: 'zhihu',
          text: 'zhangzisu'
        },
        {
          color: 'EB1923',
          text: '2807616946',
          label: 'QQ'
        },
        {
          text: '(86) 18067896891',
          label: 'TEL'
        }
      ],
      typing: false,

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
