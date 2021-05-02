<template>
  <v-card>
    <v-card-title>Tags</v-card-title>
    <v-divider />
    <template v-if="$fetchState.pending">
      <v-skeleton-loader type="article" />
    </template>
    <template v-else-if="tags">
      <tag-chip
        v-for="(tag, i) of tags"
        :key="'t' + i"
        class="ma-1"
        :tag="tag"
      />
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import TagChip from '~/components/tag/TagChip.vue'

export default Vue.extend({
  components: {
    TagChip
  },
  data() {
    return {
      tags: []
    }
  },
  async fetch() {
    const data: any = await this.$http.$get('/tag')
    this.tags = data.items
  }
})
</script>
