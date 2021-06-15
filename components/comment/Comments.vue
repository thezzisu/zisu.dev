<template>
  <v-card v-bind="$attrs">
    <template v-if="$fetchState.pending">
      <v-skeleton-loader type="article" />
    </template>
    <template v-else-if="data">
      <v-card-title>
        <div>Comments({{ data.comments.totalCount }})</div>
        <v-spacer />
        <div class="text-right">
          <div class="text-caption text--secondary">
            Powered by Github Discussions
          </div>
          <div class="text-caption">
            <a :href="data.url" target="_blank" rel="noopener">
              View on Github
            </a>
          </div>
        </div>
      </v-card-title>
      <template v-if="data.comments.nodes.length">
        <v-divider />
        <comment-item
          v-for="comment of data.comments.nodes"
          :key="comment.id"
          :data="comment"
          @more="handleMore(comment, $event)"
        />
      </template>
      <template v-if="data.comments.pageInfo.hasNextPage">
        <v-divider />
        <v-card-actions>
          <v-btn block outlined @click="loadMore">Load more</v-btn>
        </v-card-actions>
      </template>
    </template>
    <template v-else>
      <v-card-title>Comment is disabled</v-card-title>
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import CommentItem from '~/components/comment/CommentItem.vue'

export default Vue.extend({
  name: 'Comments',
  components: { CommentItem },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    data: null as any
  }),
  async fetch() {
    try {
      this.data = await this.$axios.$get(`/api/comments?id=${this.id}`, {
        baseURL: '/'
      })
    } catch (e) {
      this.data = null
    }
  },
  fetchOnServer: false,
  methods: {
    async loadMore() {
      try {
        const data = await this.$axios.$get(
          `/api/comments/more?node=${this.data.id}&cursor=${this.data.comments.pageInfo.endCursor}`,
          {
            baseURL: '/'
          }
        )
        this.data.comments.pageInfo = data.pageInfo
        this.data.comments.nodes.push(...data.nodes)
      } catch (e) {
        //
      }
    },
    handleMore(comment: any, data: any) {
      comment.replies.pageInfo = data.pageInfo
      comment.replies.nodes.push(...data.nodes)
    }
  }
})
</script>
