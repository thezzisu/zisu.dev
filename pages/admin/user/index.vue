<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xl="6">
        <v-card>
          <v-card-title>Admin: Users</v-card-title>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn outlined to="/admin/user/new" nuxt>New User</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" xl="6">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="users"
            :options.sync="tableOptions"
            :server-items-length="userCount"
            :loading="$fetchState.pending"
            dense
          >
            <template #[`item._id`]="{ item }">
              <nuxt-link class="z-object-id" :to="'/user/' + item._id" nuxt>
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
  name: 'AdminUserPage',
  data() {
    return {
      headers: [
        { text: 'ID', value: '_id', sortable: false },
        { text: 'Slug', value: 'slug', sortable: false },
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Email', value: 'email', sortable: false }
      ],
      users: [],
      tableOptions: {
        page: 1,
        itemsPerPage: 15
      },
      userCount: 0
    }
  },
  async fetch() {
    const { page, itemsPerPage } = this.tableOptions
    const params: Record<string, any> = {
      page,
      per_page: itemsPerPage
    }

    const data: any = await this.$axios.$get('/user/', {
      params
    })

    this.users = data.items
    this.userCount = data.total
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
