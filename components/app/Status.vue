<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <v-btn
        :color="colors[status]"
        v-bind="attrs"
        target="_blank"
        href="https://status.zisu.dev"
        :loading="!booted"
        depressed
        small
        class="text-none"
        v-on="on"
      >
        <v-icon left>{{ icons[status] }}</v-icon>
        status: {{ status }}
      </v-btn>
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
    booted: true,
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
    this.booted = true
  }
})
</script>
