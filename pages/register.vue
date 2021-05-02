<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card>
          <v-card-title>
            Register
            <v-spacer />
            <v-btn outlined to="/login" nuxt>
              Login
              <v-icon right>{{ mdiLoginVariant }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-text-field v-model="login" label="Username" />
            <v-text-field v-model="pass" label="Password" type="password" />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="githubEnabled"
              color="#181717"
              dark
              :disabled="loading"
              @click="githubOpen"
            >
              <v-icon left>{{ mdiGithub }}</v-icon>
              Github
            </v-btn>
            <v-btn color="primary" :loading="loading" @click="submit">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiLoginVariant, mdiGithub } from '@mdi/js'
import jwtDecode from 'jwt-decode'
import { enabled, open, getState } from '~/utils/github'

export default Vue.extend({
  name: 'RegisterPage',
  middleware(ctx) {
    const { store, redirect } = ctx
    if (store.state.token) {
      return redirect('/')
    }
  },
  data() {
    return {
      loading: false,
      login: '',
      pass: '',
      githubEnabled: enabled,
      mdiLoginVariant,
      mdiGithub
    }
  },
  head() {
    return {
      title: 'Register'
    }
  },
  mounted() {
    const githubState = getState()
    if (githubState) {
      const { code, state } = this.$route.query
      if (githubState === state) {
        this.githubLogin(code, state)
      } else {
        this.$router.replace('/')
      }
    }
  },
  methods: {
    async submit() {
      this.loading = true
      await this.$toast.$wrap(async () => {
        throw await new Error('Only Github OAuth is currently supported')
      })
      this.loading = false
    },
    githubOpen() {
      open()
    },
    async githubLogin(code: string, state: string) {
      this.loading = true
      await this.$toast.$wrap(async () => {
        const body = { code, state }
        const res: any = await this.$http.$post('/oauth/github/register', body)
        this.setToken(res.token)
        this.$store.commit(':login', res)
        this.$router.push(`/user/${res.user._id}`)
        return { title: `Welcome ${res.user.name}` }
      })
      this.loading = false
    },
    setToken(token: string) {
      const { exp } = jwtDecode(token) as any
      this.$cookies.set('token', token, { expires: new Date(exp * 1000) })
      this.$http.setToken(token, 'Bearer')
    }
  }
})
</script>
