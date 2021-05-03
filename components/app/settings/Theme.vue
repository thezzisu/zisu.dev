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

const themes = ['auto', 'dark', 'light']

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
    theme: {
      get() {
        return themes.indexOf(this.$store.state.theme)
      },
      set(val: number) {
        this.setTheme(themes[val])
      }
    }
  },
  methods: {
    setTheme(theme: string) {
      this.$cookies.set('theme', theme, {
        expires: new Date(2147483647000),
        path: '/'
      })
      this.$store.commit('theme:update', theme)
    }
  }
})
</script>
