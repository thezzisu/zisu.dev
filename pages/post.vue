<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="8" lg="6">
        <nuxt-child />
      </v-col>
      <v-col cols="12" sm="5" md="4" lg="3">
        <post-sidebar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PostSidebar from '~/components/post/PostSidebar.vue'

export default Vue.extend({
  name: 'PostPage',
  components: { PostSidebar },
  head() {
    return {
      titleTemplate: '%s - Blog - zisu.dev'
    }
  },
  created() {
    this.$store.commit('scope:update', 'blog')
  }
})
</script>
