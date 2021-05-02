<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="6">
        <v-card>
          <v-card-title>Admin: Metas</v-card-title>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn outlined to="/admin/meta/new" nuxt>New Meta Item</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" xl="6">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="metas"
            :options.sync="tableOptions"
            :server-items-length="metaCount"
            :loading="$fetchState.pending"
            dense
          >
            <template #[`item._id`]="{ item }">
              <nuxt-link
                class="z-object-id"
                :to="'/admin/meta/' + item._id"
                nuxt
              >
                {{ item._id }}
              </nuxt-link>
            </template>
            <template #[`item.slug`]="{ item }">
              <span class="z-object-id">
                {{ item.slug }}
              </span>
            </template>
            <template #[`item.public`]="{ item }">
              <v-icon v-if="item.public" color="green">
                {{ mdiLockOpen }}
              </v-icon>
              <v-icon v-else color="red">{{ mdiLock }}</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiLockOpen, mdiLock } from '@mdi/js'

export default Vue.extend({
  name: 'AdminMetaPage',
  data() {
    return {
      headers: [
        { text: 'ID', value: '_id', sortable: false },
        { text: 'Slug', value: 'slug', sortable: false },
        { text: '', value: 'public', sortable: false }
      ],
      metas: [],
      tableOptions: {
        page: 1,
        itemsPerPage: 15
      },
      metaCount: 0,
      mdiLockOpen,
      mdiLock
    }
  },
  async fetch() {
    const { page, itemsPerPage } = this.tableOptions
    const searchParams: Record<string, any> = {
      page,
      per_page: itemsPerPage
    }

    const data: any = await this.$http.$get('/meta/', {
      searchParams
    })

    this.metas = data.items
    this.metaCount = data.total
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
    this.$store.commit('scope:update', 'admin::meta')
  }
})
</script>
