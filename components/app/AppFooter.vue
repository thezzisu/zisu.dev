<template>
  <v-footer>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row justify="end">
          <v-col cols="auto">
            <template v-for="(badge, i) of badges">
              <v-hover v-slot="{ hover }" :key="i">
                <v-btn
                  :href="badge.href"
                  :color="badge.color"
                  small
                  depressed
                  tile
                  target="_blank"
                  rel="noopener"
                  :aria-label="badge.text"
                >
                  <v-icon :left="hover">{{ badge.icon }}</v-icon>
                  <template v-if="hover">
                    {{ badge.text }}
                  </template>
                </v-btn>
              </v-hover>
            </template>
          </v-col>
        </v-row>
        <v-divider />
        <v-row justify="right" no-gutters>
          <v-col>
            <div class="text-right">
              <div>
                <code>&copy; {{ new Date().getFullYear() }} ZhangZisu</code>
              </div>
              <div>
                Background Image Credit:
                <a href="https://www.pixiv.net/users/45482476">あをもみじ</a>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCertificate, mdiCreativeCommons, mdiGit } from '@mdi/js'

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      build: BUILD,
      badges: [
        {
          href: 'https://github.com/thezzisu/zisu.dev/commit/' + BUILD.git.hash,
          color: '#F05032',
          icon: mdiGit,
          text: BUILD.git.hash
        },
        {
          href: 'https://github.com/thezzisu/zisu.dev/blob/master/LICENSE',
          color: 'blue',
          icon: mdiCertificate,
          text: 'MIT'
        },
        {
          href: 'https://creativecommons.org/licenses/by-sa',
          color: '#EF9421',
          icon: mdiCreativeCommons,
          text: 'BY-SA'
        }
      ]
    }
  }
})
</script>
