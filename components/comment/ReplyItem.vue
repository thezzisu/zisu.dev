<template>
  <v-card-text>
    <v-card outlined>
      <v-card-title>
        <v-avatar size="32">
          <img :alt="data.thezzisu" :src="avatar" />
        </v-avatar>
        <div class="ml-2">
          <div class="text-subtitle-2">{{ data.author.login }}</div>
          <div class="caption">{{ formatDate(data.createdAt) }}</div>
        </div>
        <v-spacer />
        <div class="text-caption">
          <a :href="data.url" target="_blank" rel="noopener">
            View on Github
          </a>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <template v-if="data.deletedAt">
          <i>This comment was deleted.</i>
        </template>
        <template v-else>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <article class="markdown-body" v-html="data.bodyHTML" />
        </template>
      </v-card-text>
    </v-card>
  </v-card-text>
</template>

<script lang="ts">
import Vue from 'vue'
import { img } from '~/utils/statically'

export default Vue.extend({
  name: 'ReplyItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    avatar() {
      return img(this.data.author.avatarUrl)
    }
  },
  methods: {
    formatDate(date: string) {
      return new Date(date).toLocaleString()
    }
  }
})
</script>
