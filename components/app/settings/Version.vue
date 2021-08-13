<template>
  <div class="pb-2 px-4">
    <div class="text-button">Version</div>
    <div class="version-info">
      <code>
        {{ build.version }} {{ build.git.hash }} {{ build.git.branch }}
      </code>
    </div>
    <div class="build-info">
      <code>
        {{ new Date(build.time).toJSON() }}
      </code>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Version',
  data() {
    return {
      build: BUILD
    }
  }
})
</script>

<style scoped>
.version-info {
  font-size: 0.75rem;
}
.build-info {
  font-size: 0.6rem;
}
</style>
