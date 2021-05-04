<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="4">
        <v-card>
          <v-card-title>Build details</v-card-title>
          <v-divider />
          <v-list color="transparent">
            <v-list-item v-for="(build, i) of builds" :key="i">
              <v-list-item-avatar tile size="24">
                <v-icon :color="build.color">{{ build.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <code>{{ build.title }}</code>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <code>{{ build.subtitle }}</code>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="4">
        <v-card>
          <v-card-title>CI/CD</v-card-title>
          <v-divider />
          <v-list color="transparent">
            <v-list-item
              v-for="(info, i) of infos"
              :key="i"
              :href="info.link"
              target="_blank"
              rel="noopener"
            >
              <v-list-item-avatar tile size="24">
                <v-icon>{{ info.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ info.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ info.description }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row dense>
                  <v-col v-for="(badge, j) of info.badges" :key="j">
                    <v-img :src="badge + '&t=' + t" />
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="4">
        <v-card>
          <v-card-title>Powered By</v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <v-icon
              v-for="(power, i) of powers"
              :key="i"
              :color="power.color"
              large
            >
              {{ power.icon }}
            </v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mdiBookClockOutline,
  mdiGit,
  mdiNodejs,
  mdiNuxt,
  mdiPackageVariant,
  mdiVuejs,
  mdiVuetify,
  mdiWeb,
  mdiWebpack
} from '@mdi/js'

export default Vue.extend({
  name: 'Build',
  data() {
    return {
      t: 0,
      builds: [
        { color: '#CB3837', icon: mdiPackageVariant, title: BUILD.version },
        {
          color: '#F05032',
          icon: mdiGit,
          title: BUILD.git.hash,
          subtitle: BUILD.git.branch
        },
        {
          icon: mdiBookClockOutline,
          title: new Date(BUILD.time).toLocaleDateString(),
          subtitle: new Date(BUILD.time).toLocaleTimeString()
        }
      ],
      infos: [
        {
          name: 'Website',
          description: 'zisu.dev',
          link: '/',
          badges: [
            'https://img.shields.io/github/deployments/thezzisu/zisu.dev/Production?label=&logo=vercel&style=flat-square',
            'https://img.shields.io/github/workflow/status/thezzisu/zisu.dev/ci?label=&logo=github&style=flat-square'
          ],
          icon: mdiWeb
        }
      ],
      powers: [
        { color: '#339933', icon: mdiNodejs },
        { color: '#8DD6F9', icon: mdiWebpack },
        { color: '#4FC08D', icon: mdiVuejs },
        { color: '#00C58E', icon: mdiNuxt },
        { color: '#1867C0', icon: mdiVuetify }
      ]
    }
  },
  head() {
    return {
      title: 'Build Info'
    }
  },
  created() {
    this.$store.commit('scope:update', 'build info')
  }
})
</script>
