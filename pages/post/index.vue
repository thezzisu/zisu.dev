<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card>
        <v-card-actions>
          <v-text-field
            v-model.trim.lazy="searchInput"
            label="Search"
            placeholder="Type your query here"
            :append-icon="mdiMagnify"
            clearable
            @click:append="search = searchInput"
            @keydown.enter="search = searchInput"
          />
        </v-card-actions>
        <v-divider />
        <v-card-text>
          <code
            >{{
              postCount
                ? `Showing ${(curPage - 1) * postPerPage + 1}-${Math.min(
                    curPage * postPerPage,
                    postCount
                  )} of ${postCount} posts`
                : 'No posts found'
            }}
            {{ search ? 'with search ' + search : '' }}
          </code>
        </v-card-text>
      </v-card>
    </v-col>
    <template v-if="$fetchState.pending">
      <v-col cols="12">
        <v-card>
          <v-skeleton-loader type="article" />
        </v-card>
      </v-col>
    </template>
    <template v-else-if="$fetchState.error">
      <v-col cols="12">
        <error-card :error="$fetchState.error" @reload="$fetch" />
      </v-col>
    </template>
    <template v-else>
      <v-col cols="12">
        <post-list :posts="posts" />
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="curPage" :length="pageCount" />
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiMagnify } from '@mdi/js'
import PostList from '~/components/post/PostList.vue'
import ErrorCard from '~/components/app/ErrorCard.vue'

export default Vue.extend({
  name: 'PostPage',
  components: { PostList, ErrorCard },
  data() {
    return {
      posts: [],
      postCount: 0,
      pageCount: 1,
      postPerPage: 15,
      curPage: 1,
      search: '',
      searchInput: '',
      mdiMagnify
    }
  },
  async fetch() {
    const params: Record<string, any> = {
      page: this.curPage,
      per_page: this.postPerPage
    }
    if (this.search) {
      params.search = this.search
    }

    const data: any = await this.$axios.$get('/post/', {
      params
    })

    this.posts = data.items
    this.postCount = data.total
    this.pageCount = Math.ceil(data.total / this.postPerPage)
  },
  head: {
    title: 'Index'
  },
  watch: {
    curPage() {
      this.$fetch()
    },
    search() {
      this.$fetch()
    }
  }
})
</script>
