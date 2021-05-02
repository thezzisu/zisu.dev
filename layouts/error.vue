<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-card class="text-center">
          <template v-if="error.statusCode === 404">
            <v-icon size="96px">{{ mdiMapMarkerQuestionOutline }}</v-icon>
            <v-card-text>
              <span class="text-h4">{{ pageNotFound }}</span>
              <br />
              <code>{{ error.message }}</code>
            </v-card-text>
          </template>
          <template v-else>
            <v-icon size="96px">{{ mdiAlertCircleOutline }}</v-icon>
            <v-card-text>
              <span class="text-h4">{{ otherError }}</span>
              <br />
              <code>{{ error.message }}</code>
            </v-card-text>
          </template>
          <v-divider />
          <v-card-actions>
            <v-row>
              <v-col cols="12" lg="6">
                <v-btn color="success" block @click="$router.go(-1)">
                  Go Back
                </v-btn>
              </v-col>
              <v-col cols="12" lg="6">
                <v-btn color="primary" block to="/" nuxt>Go Home</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiMapMarkerQuestionOutline, mdiAlertCircleOutline } from '@mdi/js'

export default Vue.extend({
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      mdiAlertCircleOutline,
      mdiMapMarkerQuestionOutline
    }
  },
  head() {
    const title: string =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
