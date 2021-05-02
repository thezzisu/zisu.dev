<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card>
          <v-card-title>
            Login
            <v-spacer />
            <v-btn outlined to="/register" nuxt>
              Register
              <v-icon right>{{ mdiAccountPlus }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-text-field v-model="login" label="Username" />
            <v-text-field v-model="pass" label="Password" type="password" />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-select
              v-model="session"
              :items="['1d', '30d']"
              label="Session"
            />
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
import { mdiAccountPlus, mdiGithub } from '@mdi/js'
import jwtDecode from 'jwt-decode'
import { enabled, open, getState } from '~/utils/github'

export default Vue.extend({
  name: 'LoginPage',
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
      session: '1d',
      githubEnabled: enabled,
      mdiAccountPlus,
      mdiGithub
    }
  },
  head() {
    return {
      title: 'Login'
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
        const body = {
          login: this.login,
          pass: this.pass,
          expires: this.session
        }
        const res: any = await this.$http.$post('/login', body)
        this.setToken(res.token)
        this.$store.commit(':login', res)
        this.$router.push('/')
        return { title: `Welcome ${res.user.name}` }
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
        const res: any = await this.$http.$post('/oauth/github/login', body)
        this.setToken(res.token)
        this.$store.commit(':login', res)
        this.$router.push('/')
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
