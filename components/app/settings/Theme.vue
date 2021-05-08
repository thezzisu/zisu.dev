<template>
  <div class="pb-2 pl-4">
    <div class="text-button">Theme</div>
    <v-btn-toggle v-model="theme" mandatory>
      <v-btn>
        <v-icon>{{ mdiDesktopTowerMonitor }}</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>{{ mdiWeatherNight }}</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>{{ mdiWhiteBalanceSunny }}</v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mdiWhiteBalanceSunny,
  mdiWeatherNight,
  mdiDesktopTowerMonitor
} from '@mdi/js'
import { sync } from 'vuex-pathify'

export default Vue.extend({
  name: 'Theme',
  data() {
    return {
      mdiWhiteBalanceSunny,
      mdiWeatherNight,
      mdiDesktopTowerMonitor
    }
  },
  computed: {
    theme: sync('persist@theme')
  }
})
</script>
