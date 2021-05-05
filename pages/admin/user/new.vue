<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <v-card :loading="loading">
              <v-card-text> Not implemented </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn color="error" @click="reset">Reset</v-btn>
                <v-btn color="primary" @click="submit">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AdminTagNewPage',
  data() {
    return {
      loading: false,
      tag: {
        slug: '',
        title: ''
      }
    }
  },
  methods: {
    reset() {
      this.$router.go(0)
    },
    async submit() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        throw await new Error('Not implemented')
        // this.$toast.success({ title: 'Success', message: 'ID: ' + _id })
        // this.$router.push('/user/' + _id)
      })
      this.loading = false
    }
  }
})
</script>
