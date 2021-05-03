<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <template v-if="$fetchState.pending">
          <v-card>
            <v-skeleton-loader type="article" />
          </v-card>
        </template>
        <template v-else-if="$fetchState.error">
          <error-card :error="$fetchState.error" @reload="$fetch" />
        </template>
        <template v-else>
          <post :post="post" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Post from '~/components/post/Post.vue'
import ErrorCard from '~/components/app/ErrorCard.vue'

export default Vue.extend({
  components: { Post, ErrorCard },
  data() {
    return {
      post: {} as any
    }
  },
  async fetch() {
    const slug = this.$route.params.slug
    this.post = await this.$axios.$get(`/post/${slug}`)
    if (this.post.priority >= 0) {
      this.$nuxt.context.redirect(`/post/${this.post.slug}`)
    }
  },
  head() {
    return {
      title: this.$data.post.title
    }
  }
})
</script>
