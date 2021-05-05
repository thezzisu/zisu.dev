<template>
  <v-container>
    <v-row v-for="(row, i) of rows" :key="i" justify="center">
      <v-col cols="12">
        <div class="text-center text-h6">{{ row.name }}</div>
      </v-col>
      <v-col v-for="(x, j) of row.links" :key="j" cols="6" sm="4" md="3" xl="2">
        <v-card :href="x.link" target="_blank" rel="noopener" hover>
          <v-img
            :src="screenshotUrl(x.link)"
            height="200px"
            class="align-end white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>
              <v-avatar v-if="x.avatar" class="mr-4">
                <v-img :src="x.avatar" />
              </v-avatar>
              {{ x.name }}
            </v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-divider />
    <v-row justify="center">
      <v-col cols="auto">Want to add yours? Please contact me :D</v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiAccountCircle } from '@mdi/js'
import { screenshot } from '~/utils/statically'

export default Vue.extend({
  name: 'LinkPage',
  data() {
    return {
      rows: [
        {
          name: 'Friends',
          links: [
            {
              avatar:
                'https://www.gravatar.com/avatar/6563066d6b1ac788fca3a8033c382c46',
              name: 'skylee',
              link: 'https://skylee.xyz/'
            },
            {
              avatar:
                'https://cdn.jsdelivr.net/gh/ZigZagK/jsDelivrCDN@latest/usr/uploads/2018/07/176242131.png',
              name: 'ZigZagK',
              link: 'https://zigzagk.top/'
            },
            {
              avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1254846416&s=640',
              name: 'Mo Yi',
              link: 'https://nekomoyi.com/'
            }
          ]
        },
        {
          name: 'Useful websites',
          links: [
            {
              name: 'Anime Sharing',
              link: 'http://www.anime-sharing.com'
            },
            {
              name: '轻小说文库',
              link: 'https://www.wenku8.net/index.php'
            },
            {
              name: 'nyaa',
              link: 'https://nyaa.si'
            }
          ]
        }
      ],
      mdiAccountCircle
    }
  },
  head() {
    return {
      title: 'Links'
    }
  },
  methods: {
    screenshotUrl(link: string) {
      return screenshot(link)
    }
  }
})
</script>
