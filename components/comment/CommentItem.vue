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
      <v-card-text class="text-right py-0">
        {{ data.replies.totalCount ? `${data.replies.totalCount}` : 'no' }}
        {{ data.replies.totalCount > 1 ? 'replies' : 'reply' }}
      </v-card-text>
      <template v-if="data.replies.nodes.length">
        <v-divider />
        <reply-item
          v-for="reply of data.replies.nodes"
          :key="reply.id"
          :data="reply"
        />
      </template>
      <template v-if="data.replies.pageInfo.hasNextPage">
        <v-divider />
        <v-card-actions>
          <v-btn block outlined @click="loadMore">Load more</v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-card-text>
</template>

<script lang="ts">
import Vue from 'vue'
import { img } from '~/utils/statically'
import ReplyItem from '~/components/comment/ReplyItem.vue'

export default Vue.extend({
  name: 'CommentItem',
  components: { ReplyItem },
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
    },
    async loadMore() {
      try {
        const data = await this.$axios.$get(
          `/api/comments/replies/more?node=${this.data.id}&cursor=${this.data.replies.pageInfo.endCursor}`,
          {
            baseURL: '/'
          }
        )
        this.$emit('more', data)
      } catch (e) {
        //
      }
    }
  }
})
</script>
