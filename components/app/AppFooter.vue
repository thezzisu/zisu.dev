<template>
  <v-footer>
    <v-container fluid>
      <v-row justify="end">
        <v-col>
          <div class="text-right text-monospace text--white">
            <div>
              <template v-for="(badge, i) of badges">
                <span :key="i">
                  <v-icon>{{ badge.icon }}</v-icon>
                  {{ badge.text }}
                </span>
              </template>
            </div>
            <div>&copy; {{ new Date().getFullYear() }} ZhangZisu</div>
            <div>
              Background Author:
              <a href="https://www.pixiv.net/users/45482476">あをもみじ</a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCertificate, mdiCreativeCommons } from '@mdi/js'

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      build: BUILD,
      badges: [
        {
          icon: mdiCertificate,
          text: 'MIT'
        },
        {
          icon: mdiCreativeCommons,
          text: 'BY-SA'
        }
      ]
    }
  }
})
</script>
