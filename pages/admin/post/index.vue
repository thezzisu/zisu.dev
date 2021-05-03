<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>Admin: Posts</v-card-title>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn outlined to="/admin/post/new" nuxt>New Post</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" xl="6">
        <post-table />
      </v-col>
      <v-col cols="12" xl="6">
        <post-table page />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PostTable from '~/components/admin/post/PostTable.vue'

export default Vue.extend({
  name: 'AdminPostPage',
  components: { PostTable },
  created() {
    this.$store.commit('scope:update', 'admin::post')
  }
})
</script>
