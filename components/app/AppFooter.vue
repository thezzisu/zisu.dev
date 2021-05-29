<template>
  <v-footer>
    <v-container fluid>
      <v-row justify="end">
        <v-col cols="auto">
          <div class="text-center text-monospace text--white">
            <div>
              <v-btn
                depressed
                target="_blank"
                href="https://dev2dev.zisu.dev"
                rel="noreferrer"
                small
                class="text-none"
                dark
              >
                <v-icon left>{{ svgDev2Dev }}</v-icon>
                Dev2Dev
              </v-btn>
            </div>
            <div>
              <v-btn
                depressed
                target="_blank"
                href="https://travellings.link"
                small
                class="text-none mt-1"
              >
                <v-icon left>{{ mdiTrainVariant }}</v-icon>
                Travelling
              </v-btn>
            </div>
            <div class="mt-1">
              <status />
            </div>
          </div>
        </v-col>
        <v-divider vertical />
        <v-col cols="auto align-center d-flex">
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
            <div class="text-caption">
              BgImg Author:
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
import { mdiCertificate, mdiCreativeCommons, mdiTrainVariant } from '@mdi/js'
import Status from '~/components/app/Status.vue'
import { svgDev2Dev } from '~/utils/dev2dev'

export default Vue.extend({
  name: 'AppFooter',
  components: { Status },
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
      ],
      mdiTrainVariant,
      svgDev2Dev
    }
  }
})
</script>
