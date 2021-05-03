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
              <v-text-field :value="meta._id" disabled label="ID" />
              <v-text-field
                v-model="meta.slug"
                :disabled="isSystem"
                label="Slug"
              />
              <json-editor v-model="meta.value" />
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-switch
                v-model="meta.public"
                label="Public"
                :disabled="isProtected"
              />
              <v-spacer />
              <v-btn :disabled="loading" color="warning" @click="reset">
                Reset
              </v-btn>
              <v-btn
                color="primary"
                :disabled="isProtected || loading"
                @click="submit"
              >
                Update
              </v-btn>
              <v-btn
                color="error"
                :disabled="isSystem || loading"
                @click="remove"
              >
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
import JsonEditor from '~/components/editor/JSONEditor.vue'
import ErrorCard from '~/components/app/ErrorCard.vue'

export default Vue.extend({
  name: 'AdminMetaItemPage',
  components: { JsonEditor, ErrorCard },
  data() {
    return {
      meta: {} as any,
      loading: false
    }
  },
  async fetch() {
    const id = this.$route.params.id
    const data: any = await this.$axios.$get(`/meta/${id}`)
    this.meta = data
  },
  computed: {
    isSystem() {
      return this.$data.meta.slug.startsWith('$')
    },
    isProtected() {
      return this.$data.meta.slug.startsWith('$$')
    }
  },
  created() {
    this.$store.commit('scope:update', 'admin::meta')
  },
  methods: {
    reset() {
      this.$fetch()
    },
    async submit() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        const meta = this.$data.meta
        await this.$axios.$put(`/meta/${this.$data.meta._id}`, meta)
        return { title: 'Success' }
      })
      this.loading = false
    },
    async remove() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        await this.$axios.$delete(`/meta/${this.$data.meta._id}`)
        this.$router.replace('/admin/meta')
        return { title: 'Success' }
      })
      this.loading = false
    }
  }
})
</script>
