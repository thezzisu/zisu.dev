<template>
  <v-row dense>
    <v-col v-for="(post, i) of posts" :key="i" cols="12">
      <post-list-item :outlined="outlined" :post="post" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import PostListItem from '~/components/post/PostListItem.vue'

export default Vue.extend({
  name: 'PostList',
  components: { PostListItem },
  props: {
    posts: {
      type: Array,
      required: true
    },
    outlined: {
      type: Boolean
    }
  }
})
</script>
