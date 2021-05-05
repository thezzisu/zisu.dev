<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card :loading="loading">
          <template v-if="$fetchState.pending">
            <v-skeleton-loader type="article" />
          </template>
          <template v-else-if="$fetchState.error">
            <error-card :error="$fetchState.error" @reload="$fetch" />
          </template>
          <template v-else>
            <v-card-text>
              <v-text-field :value="tag._id" disabled label="ID" />
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
              <v-btn
                :disabled="loading"
                color="success"
                :to="'/tag/' + tag.slug"
                nuxt
              >
                View
              </v-btn>
              <v-btn :disabled="loading" color="warning" @click="reset">
                Reset
              </v-btn>
              <v-btn :disabled="loading" color="primary" @click="submit">
                Update
              </v-btn>
              <v-btn :disabled="loading" color="error" @click="remove">
                Delete
              </v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ErrorCard from '~/components/app/ErrorCard.vue'

export default Vue.extend({
  name: 'AdminTagItemPage',
  components: { ErrorCard },
  data() {
    return {
      tag: {} as any,
      loading: false
    }
  },
  async fetch() {
    const id = this.$route.params.id
    const data: any = await this.$axios.$get(`/tag/${id}`)
    this.tag = data
  },
  methods: {
    reset() {
      this.$fetch()
    },
    async submit() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        const tag = this.tag
        await this.$axios.$put(`/tag/${this.tag._id}`, tag)
        return { title: 'Success' }
      })
      this.loading = false
    },
    async remove() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        await this.$axios.$delete(`/tag/${this.tag._id}`)
        this.$router.replace('/admin/tag')
        return { title: 'Success' }
      })
      this.loading = false
    }
  }
})
</script>
