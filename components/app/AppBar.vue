<template>
  <v-app-bar app>
    <v-btn icon tile x-large @click="$emit('change', !value)">
      <v-avatar tile size="32">
        <img src="~/assets/logo.svg" alt="site logo" />
      </v-avatar>
    </v-btn>
    <v-btn text x-large class="pa-0 text-left" disabled>
      <div class="ma-2 site-title">
        <div class="font-weight-bold">zisu.dev</div>
        <div class="text-overline" style="line-height: unset">
          {{ scope }}
        </div>
      </div>
    </v-btn>
    <v-spacer />
    <user-indicator />
    <v-divider vertical inset />
    <v-btn icon aria-label="Settings" @click="settingsDrawer">
      <v-icon>{{ mdiCog }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>


<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { mdiCog } from '@mdi/js'
import UserIndicator from '~/components/app/AppBarUserIndicator.vue'

export default Vue.extend({
  name: 'App',
  components: { UserIndicator },
  model: {
    prop: 'value',
    event: 'change'
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      drawer: null,
      mdiCog
    }
  },
  computed: {
    ...mapState(['scope'])
  },
  methods: {
    settingsDrawer() {
      this.$store.commit(
        'settingsDrawer:update',
        !this.$store.state.settingsDrawer
      )
    }
  }
})
</script>

<style>
.theme--dark .site-title {
  color: #fff;
}
.theme--light .site-title {
  color: #000;
}
</style>
