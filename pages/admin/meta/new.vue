<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <v-card :loading="loading">
              <v-card-text>
                <v-text-field v-model="meta.slug" label="Slug" />
                <json-editor v-model="meta.value" />
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-switch v-model="meta.public" label="Public" />
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
import JsonEditor from '~/components/editor/JSONEditor.vue'

export default Vue.extend({
  name: 'AdminMetaNewPage',
  components: { JsonEditor },
  data() {
    return {
      loading: false,
      meta: {
        slug: '',
        value: '',
        public: false
      }
    }
  },
  created() {
    this.$store.commit('scope:update', 'admin::meta')
  },
  methods: {
    reset() {
      this.$router.go(0)
    },
    async submit() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        const meta = this.meta
        const _id: string = await this.$axios.$post(`/meta`, meta)
        this.$router.push('/admin/meta/' + _id)
        return { title: 'Success', message: 'ID: ' + _id }
      })
      this.loading = false
    }
  }
})
</script>
