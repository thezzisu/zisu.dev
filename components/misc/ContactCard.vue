<template>
  <v-card>
    <v-card-text class="d-flex text--primary">
      <div>
        <div><code>Hello! I'm Zisu Zhang</code></div>
        <div class="text-h4">
          <code>I build softwares.</code>
        </div>
      </div>
    </v-card-text>
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
              :src="`https://img.shields.io/static/v1?label=${c.label}&message=${c.text}&color=${c.color}&style=flat-square&logo=${c.icon}&logoColor=FFF`"
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
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ContactCard',
  data: () => ({
    social: [
      {
        href: 'https://github.com/thezzisu',
        img: 'https://img.shields.io/github/followers/thezzisu?label=Follow%20%40thezzisu&style=social',
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
        color: '07C160',
        icon: 'wechat',
        text: 'thezzisu',
        label: ''
      },
      {
        href: 'https://t.me/thezzisu',
        color: '2CA5E0',
        icon: 'telegram',
        text: 'thezzisu',
        label: ''
      },
      {
        href: 'https://space.bilibili.com/38430118',
        color: '00A1D6',
        icon: 'bilibili',
        text: 'thezzisu',
        label: ''
      },
      {
        href: 'https://www.zhihu.com/people/zhangzisu',
        color: '0084FF',
        icon: 'zhihu',
        text: 'thezzisu',
        label: ''
      },
      {
        color: 'EB1923',
        text: '2807616946',
        icon: 'tencentqq',
        label: ''
      },
      {
        text: '(86) 18067896891',
        label: 'TEL'
      },
      {
        href: 'mailto:thezzisu@gmail.com',
        color: 'blue',
        icon: 'gmail',
        text: 'thezzisu@gmail.com',
        label: 'Personal'
      },
      {
        href: 'mailto:thezzisu@stu.pku.edu.cn',
        color: 'blue',
        icon: 'gmail',
        text: 'thezzisu@stu.pku.edu.cn',
        label: 'School'
      }
    ]
  })
})
</script>

<style lang="scss" scoped>
</style>
