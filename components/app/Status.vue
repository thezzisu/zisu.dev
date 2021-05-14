<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <v-chip
        :color="colors[status]"
        v-bind="attrs"
        target="_blank"
        href="https://stats.uptimerobot.com/rm4gOFAYgV"
        v-on="on"
      >
        <v-icon left>{{ icons[status] }}</v-icon>
        status: {{ status }}
      </v-chip>
    </template>
    <span>
      {{ counts }}
    </span>
  </v-tooltip>
</template>

<script lang="ts">
import {
  mdiAlert,
  mdiCheck,
  mdiCircleOutline,
  mdiLoading,
  mdiPause
} from '@mdi/js'
import Vue from 'vue'
export default Vue.extend({
  name: 'Status',
  data: () => ({
    status: 'loading',
    counts: 'loading',
    colors: {
      up: 'success',
      down: 'error',
      degraded: 'warning'
    },
    icons: {
      up: mdiCheck,
      down: mdiAlert,
      degraded: mdiCircleOutline,
      loading: mdiLoading,
      paused: mdiPause
    }
  }),
  async fetch() {
    const { status, counts } = await this.$axios.$get(
      'https://api.zisu.dev/status/summary'
    )
    this.status = status
    const { up, down, paused, total } = counts
    this.counts = `up ${up} down ${down} paused ${paused} total ${total}`
  }
})
</script>
