<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <v-card :loading="loading">
              <v-card-text>
                <v-text-field v-model="tag.slug" label="Slug" />
                <v-text-field v-model="tag.title" label="Title" />
                <v-textarea
                  v-model="tag.content"
                  label="Content"
                  class="code-editor"
                />
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn :disabled="loading" color="error" @click="reset">
                  Reset
                </v-btn>
                <v-btn :disabled="loading" color="primary" @click="submit">
                  Create
                </v-btn>
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
        title: '',
        content: ''
      }
    }
  },
  created() {
    this.$store.commit('scope:update', 'admin::tag')
  },
  methods: {
    reset() {
      this.$router.go(0)
    },
    async submit() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        const tag = this.$data.tag
        const _id: string = await this.$axios.$post(`/tag`, tag)
        this.$router.push('/admin/tag/' + _id)
        return { title: 'Success', message: 'ID: ' + _id }
      })
      this.loading = false
    }
  }
})
</script>
