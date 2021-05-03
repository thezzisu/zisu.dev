<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="8" lg="6">
        <v-row v-if="tag" justify="center">
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <v-icon left>{{ mdiLabel }}</v-icon>
                {{ tag.title }}
              </v-card-title>
              <template v-if="isAdmin">
                <v-divider />
                <v-card-text>
                  <v-btn outlined small :to="'/admin/tag/' + tag._id" nuxt>
                    Edit
                  </v-btn>
                </v-card-text>
              </template>
              <v-divider />
              <v-card-text>
                <bml :value="tag.content" />
              </v-card-text>
              <v-divider />
              <v-card-text>
                <code>{{
                  postCount
                    ? `Showing ${(curPage - 1) * postPerPage + 1}-${Math.min(
                        curPage * postPerPage,
                        postCount
                      )} of ${postCount} posts`
                    : 'No posts found'
                }}</code>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <template v-if="$fetchState.pending">
          <v-row justify="center">
            <v-col cols="12">
              <v-card>
                <v-skeleton-loader type="article" />
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template v-else-if="$fetchState.error">
          <v-row justify="center">
            <v-col cols="auto">
              <error-card :error="$fetchState.error" @reload="$fetch" />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <post-list :posts="posts" />
          <v-row justify="center">
            <v-col cols="auto">
              <v-pagination v-model="curPage" :length="pageCount" />
            </v-col>
          </v-row>
        </template>
      </v-col>
      <v-col cols="12" sm="5" md="4" lg="3">
        <post-sidebar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { mdiLabel } from '@mdi/js'
import PostList from '~/components/post/PostList.vue'
import PostSidebar from '~/components/post/PostSidebar.vue'
import Bml from '~/components/bml/Bml'
import ErrorCard from '~/components/app/ErrorCard.vue'

export default Vue.extend({
  name: 'TagPage',
  components: { PostList, PostSidebar, Bml, ErrorCard },
  async asyncData(ctx) {
    const tag = await ctx.$axios.$get(`/tag/${ctx.route.params.slug}`)
    return {
      tag
    }
  },
  data() {
    return {
      posts: [],
      postCount: 0,
      pageCount: 1,
      postPerPage: 15,
      curPage: 1,
      tag: {} as any,
      mdiLabel
    }
  },
  async fetch() {
    const data: any = await this.$axios.$get('/post/', {
      params: {
        page: this.curPage,
        per_page: this.postPerPage,
        tag: this.tag._id
      }
    })
    this.posts = data.items
    this.postCount = data.total
    this.pageCount = Math.ceil(data.total / this.postPerPage)
  },
  head() {
    return {
      title: 'Tag: ' + this.$data.tag.title
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  },
  watch: {
    curPage() {
      this.$fetch()
    }
  }
})
</script>
