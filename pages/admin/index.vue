<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="7" md="6" lg="4">
        <v-card>
          <v-card-title>Admin Dashboard</v-card-title>
          <v-divider />
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Server version</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ stat.version }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Frontend version</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ build.version }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Frontend node version</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ build.node }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Post count</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ stat.posts }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>User count</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ stat.users }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Tag count</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ stat.tags }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="7" md="6" lg="4">
        <v-card>
          <v-card-title>Database</v-card-title>
          <v-divider />
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>DB name</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ stat.db.db }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>DB collections</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ stat.db.collections }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>DB indexes</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ stat.db.indexes }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="7" md="12" lg="4">
        <v-card>
          <v-card-title>Raw</v-card-title>
          <v-divider />
          <v-card-text>
            <prism :value="JSON.stringify(stat, null, '\t')" lang="json" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Prism from '~/components/bml/Code'

export default Vue.extend({
  name: 'AdminHomePage',
  components: { Prism },
  data() {
    return {
      stat: {
        db: {}
      },
      build: BUILD
    }
  },
  async fetch() {
    this.stat = await this.$http.$get('/admin/stat')
  },
  created() {
    this.$store.commit('scope:update', 'admin')
  }
})
</script>
