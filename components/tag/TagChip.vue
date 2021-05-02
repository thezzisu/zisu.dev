<template>
  <v-chip
    label
    :to="(admin ? '/admin/tag/' : '/tag/') + tag.slug"
    outlined
    small
    nuxt
  >
    <v-icon v-if="!noIcon" left>{{ mdiLabel }}</v-icon>
    {{ tag.title }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiLabel } from '@mdi/js'

export default Vue.extend({
  name: 'TagChip',
  props: {
    tag: {
      type: Object,
      required: true
    },
    noIcon: {
      type: Boolean
    },
    admin: {
      type: Boolean
    }
  },
  data() {
    return {
      mdiLabel
    }
  }
})
</script>
