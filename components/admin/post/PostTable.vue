<template>
  <v-card>
    <v-card-title>{{ page ? 'Page' : 'Post' }} List</v-card-title>
    <v-divider />
    <v-data-table
      :headers="headers"
      :items="posts"
      :options.sync="postsTableOpt"
      :server-items-length="postCount"
      :loading="$fetchState.pending"
      dense
    >
      <template #[`item._id`]="{ item }">
        <nuxt-link class="z-object-id" :to="'/admin/post/' + item._id" nuxt>
          {{ item._id }}
        </nuxt-link>
      </template>
      <template #[`item.tags`]="{ item }">
        <tag-chip
          v-for="(tag, i) of item.tags"
          :key="i"
          class="ma-1"
          :tag="tag"
          no-icon
          admin
        />
      </template>
    </v-data-table>
  </v-card>
</template>


<script lang="ts">
import Vue from 'vue'
import TagChip from '~/components/tag/TagChip.vue'

export default Vue.extend({
  name: 'PostTable',
  components: { TagChip },
  props: {
    page: {
      type: Boolean
    }
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: '_id', sortable: false },
        { text: 'Slug', value: 'slug', sortable: false },
        { text: 'Title', value: 'title', sortable: false },
        { text: 'Tags', value: 'tags', sortable: false }
      ],
      posts: [],
      postsTableOpt: {
        page: 1,
        itemsPerPage: 15
      },
      postCount: 0
    }
  },
  async fetch() {
    const { page, itemsPerPage } = this.postsTableOpt
    const params: Record<string, any> = {
      page,
      per_page: itemsPerPage,
      published_before: 8640000000000000
    }

    const data: any = await this.$axios.$get(this.page ? '/page/' : '/post', {
      params
    })

    this.posts = data.items
    this.postCount = data.total
  },
  watch: {
    options: {
      handler() {
        this.$fetch()
      },
      deep: true
    }
  }
})
</script>
