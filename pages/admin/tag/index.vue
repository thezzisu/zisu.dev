<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="6">
        <v-card>
          <v-card-title>Admin: Tags</v-card-title>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn outlined to="/admin/tag/new" nuxt>New Tag</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" xl="6">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="tags"
            :options.sync="tableOptions"
            :server-items-length="tagCount"
            :loading="$fetchState.pending"
            dense
          >
            <template #[`item._id`]="{ item }">
              <nuxt-link
                class="z-object-id"
                :to="'/admin/tag/' + item._id"
                nuxt
              >
                {{ item._id }}
              </nuxt-link>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AdminTagPage',
  data() {
    return {
      headers: [
        { text: 'ID', value: '_id', sortable: false },
        { text: 'Slug', value: 'slug', sortable: false },
        { text: 'Title', value: 'title', sortable: false }
      ],
      tags: [],
      tableOptions: {
        page: 1,
        itemsPerPage: 15
      },
      tagCount: 0
    }
  },
  async fetch() {
    const { page, itemsPerPage } = this.tableOptions
    const params: Record<string, any> = {
      page,
      per_page: itemsPerPage
    }

    const data: any = await this.$axios.$get('/tag/', {
      params
    })

    this.tags = data.items
    this.tagCount = data.total
  },
  watch: {
    options: {
      handler() {
        this.$fetch()
      },
      deep: true
    }
  },
  created() {
    this.$store.commit('scope:update', 'admin::tag')
  }
})
</script>
