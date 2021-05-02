<template>
  <div class="pb-2 px-4">
    <div class="text-button">Storage</div>
    <template v-if="$fetchState.pending">
      <v-skeleton-loader type="text@2" />
    </template>
    <template v-else-if="$fetchState.error">
      {{ $fetchState.error }}
    </template>
    <template v-else>
      <v-progress-linear :value="used" />
      <div class="text-overline usage-info py-2">
        Used: {{ usage }}/{{ quota }}
      </div>
    </template>
    <v-btn block color="primary" depressed :loading="cleaning" @click="clear">
      Clear storage
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatDataSize, wait } from '~/utils/misc'

export default Vue.extend({
  name: 'Storage',
  data() {
    return {
      quota: '',
      usage: '',
      used: 0,
      cleaning: false
    }
  },
  async fetch() {
    const res = await navigator.storage.estimate()
    this.quota = formatDataSize(res.quota || 0)
    this.usage = formatDataSize(res.usage || 0)
    this.used = res.usage && res.quota ? (res.usage / res.quota) * 100 : 0
  },
  fetchOnServer: false,
  methods: {
    async clear() {
      this.cleaning = true
      await this.$toast.$wrap(async () => {
        const cacheKeys = await caches.keys()
        for (const key of cacheKeys) {
          await caches.delete(key)
        }
        await wait(500)
        return 'All cache cleared'
      })
      this.cleaning = false
      this.$fetch()
    }
  }
})
</script>

<style scoped>
.usage-info {
  line-height: 1.5;
}
</style>
