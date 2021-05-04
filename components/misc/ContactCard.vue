<template>
  <v-card class="contact">
    <v-card-title>
      <div>Contact</div>
      <v-spacer />
      <div>
        <v-avatar size="128" class="avatar">
          <img src="https://res.zisu.dev/defined/avatar_formal" />
        </v-avatar>
      </div>
    </v-card-title>
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
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ContactCard',
  data: () => ({
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
    ]
  })
})
</script>

<style lang="scss" scoped>
$avatar-margin-offset: 80px;

.contact {
  margin-top: $avatar-margin-offset;
}

.avatar {
  margin-top: -$avatar-margin-offset;
  pointer-events: none;
  user-select: none;
}
</style>
