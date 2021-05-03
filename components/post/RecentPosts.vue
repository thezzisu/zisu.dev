<template>
  <v-card>
    <v-card-title>Recent Posts</v-card-title>
    <v-divider />
    <template v-if="$fetchState.pending">
      <v-skeleton-loader type="list-item-three-line@3" />
    </template>
    <template v-else-if="$fetchState.error">
      <error-card :error="$fetchState.error" @reload="$fetch" />
    </template>
    <template v-else>
      <v-card-text>
        <post-list :posts="posts" outlined />
      </v-card-text>
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import ErrorCard from '~/components/app/ErrorCard.vue'
import PostList from '~/components/post/PostList.vue'

export default Vue.extend({
  name: 'RecentPosts',
  components: { ErrorCard, PostList },
  data() {
    return {
      posts: []
    }
  },
  async fetch() {
    const params: Record<string, any> = {
      page: 1,
      per_page: 3,
      sort: 'updated'
    }

    const data: any = await this.$axios.$get('/post/', {
      params
    })

    this.posts = data.items
  },
  fetchOnServer: false
})
</script>
