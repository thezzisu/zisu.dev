<template>
  <v-row>
    <v-col cols="12">
      <tags-card />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import TagsCard from '~/components/tag/TagsCard.vue'

export default Vue.extend({
  name: 'PostSidebar',
  components: { TagsCard }
})
</script>
