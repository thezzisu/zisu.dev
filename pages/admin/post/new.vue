<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <v-card :loading="loading">
              <v-card-text>
                <v-text-field
                  v-model.number="post.priority"
                  label="Priority"
                  type="number"
                  min="-1"
                  max="16"
                  :hint="priorityHint"
                />
                <v-text-field v-model="post.slug" label="Slug" />
                <v-text-field v-model="post.title" label="Title" />
                <v-card-subtitle>Summary</v-card-subtitle>
                <editor
                  v-model="post.summary"
                  language="txt"
                  class="editor"
                  style="height: 300px"
                />
                <v-card-subtitle>Content</v-card-subtitle>
                <editor v-model="post.content" language="txt" />
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-switch v-model="post.public" label="Public" />
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
import Editor from '~/components/editor/Editor'

export default Vue.extend({
  name: 'AdminPostNewPage',
  components: { Editor },
  data() {
    return {
      loading: false,
      post: {
        priority: 0,
        slug: '',
        title: '',
        content: '',
        summary: '',
        published: Date.now(),
        public: false
      }
    }
  },
  computed: {
    priorityHint() {
      if (this.$data.post.priority === -1)
        return "Page (won't display in post list)"
      if (this.$data.post.priority === 0) return 'Common Post'
      return 'Prioritized Post'
    }
  },
  created() {
    this.$store.commit('scope:update', 'admin::post')
  },
  methods: {
    reset() {
      this.$router.go(0)
    },
    async submit() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        const post = this.$data.post
        const _id: string = await this.$http.$post(`/post`, post)
        this.$router.push('/admin/post/' + _id)
        return { title: 'Success', message: 'ID: ' + _id }
      })
      this.loading = false
    }
  }
})
</script>
