<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="8" lg="6">
        <v-row>
          <v-col cols="12">
            <v-card :loading="loading">
              <v-card-title class="pa-0">
                <v-avatar class="ma-3">
                  <v-img :src="avatar" />
                </v-avatar>
                <v-divider vertical />
                <v-badge
                  :content="userBadge"
                  :color="user.perm.admin ? 'red' : 'blue'"
                >
                  <div class="ml-3 title" v-text="user.name" />
                </v-badge>
              </v-card-title>
              <v-divider />
              <v-tabs>
                <v-tab>Info</v-tab>
                <v-tab-item>
                  <v-list dense color="transparent">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>{{ mdiIdentifier }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          <code>{{ user._id }}</code>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>{{ mdiPound }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ user.slug }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>{{ mdiEmail }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ user.email }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-tab-item>
                <template v-if="canManage">
                  <v-tab>Edit</v-tab>
                  <v-tab-item>
                    <v-card-text>
                      <v-text-field v-model="user.name" label="Name" />
                      <v-text-field
                        v-model.lazy="user.email"
                        label="Email"
                        type="email"
                      />
                      <v-text-field
                        v-model="pass"
                        label="Password"
                        placeholder="(Do not change)"
                        type="password"
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="primary" @click="submit">Submit</v-btn>
                    </v-card-actions>
                  </v-tab-item>
                  <v-tab>OAuth</v-tab>
                  <v-tab-item>
                    <v-card-text>
                      <v-btn
                        v-if="githubEnabled"
                        color="#181717"
                        dark
                        :disabled="loading"
                        @click="oAuthGithub"
                      >
                        <v-icon left>{{ mdiGithub }}</v-icon>
                        {{ user.oauth.github ? 'Unlink' : 'Link' }}
                      </v-btn>
                    </v-card-text>
                  </v-tab-item>
                </template>
                <template v-if="isAdmin">
                  <v-tab>Admin</v-tab>
                  <v-tab-item>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="error"
                        :disabled="user.perm.admin"
                        @click="remove"
                      >
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </v-tab-item>
                </template>
              </v-tabs>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import gravatar from 'gravatar'
import { mdiIdentifier, mdiPound, mdiEmail, mdiGithub } from '@mdi/js'
import { enabled, open, getState } from '~/utils/github'

export default Vue.extend({
  async asyncData(ctx) {
    const slug = ctx.params.slug
    const data: any = await ctx.$axios.$get(`/user/${slug}`)
    return {
      user: data,
      githubEnabled: enabled
    }
  },
  data() {
    return {
      pass: '',
      loading: false,
      mdiIdentifier,
      mdiPound,
      mdiEmail,
      mdiGithub
    }
  },
  head() {
    return {
      title: 'User: ' + this.$data.user.name
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'userBadge']),
    canManage() {
      return this.isAdmin || this.$store.state.user?._id === this.$data.user._id
    },
    avatar() {
      return gravatar.url(this.$data.user.email)
    }
  },
  mounted() {
    const githubState = getState()
    if (githubState) {
      const { code, state } = this.$route.query
      if (githubState === state) {
        this.githubLink(code, state)
      } else {
        this.$router.replace('/')
      }
    }
  },
  methods: {
    async submit() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        const body: Record<string, any> = {
          name: this.$data.user.name,
          email: this.$data.user.email
        }
        if (this.pass) {
          body.pass = this.pass
        }
        await this.$axios.$put(`/user/${this.$data.user._id}`, body)
        return { title: 'Success' }
      })
      this.loading = false
    },
    async remove() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        await this.$axios.$delete(`/user/${this.$data.user._id}`)
        this.$router.replace('/admin/user')
        return { title: 'Success' }
      })
      this.loading = false
    },
    async oAuthGithub() {
      this.loading = true
      if (this.$data.user.oauth.github) {
        try {
          await this.$axios.$post(`/oauth/github/unlink/${this.$data.user._id}`)
          delete this.$data.user.oauth.github
          this.$toast.success({ title: 'Success' })
        } catch (e) {
          this.$toast.$error(e)
        }
      } else {
        open()
      }
      this.loading = false
    },
    async githubLink(code: string, state: string) {
      this.loading = true
      try {
        const body = { code, state }
        this.$data.user.oauth.github = await this.$axios.$post(
          `/oauth/github/link/${this.$data.user._id}`,
          body
        )
        this.$toast.success({ title: `Link success` })
      } catch (e) {
        this.$toast.error({ title: 'Link failed', message: e.message })
      }
      this.$router.go(0)
      this.loading = false
    }
  }
})
</script>
