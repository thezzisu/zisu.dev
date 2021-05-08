<template>
  <v-menu v-if="user" offset-y open-on-hover :close-on-content-click="false">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-avatar size="32">
          <v-img :src="getAvatar(user.email)" />
        </v-avatar>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item :to="'/user/' + user.slug" nuxt>
        <v-list-item-icon>
          <v-icon>{{ mdiAccount }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-badge
            :content="userBadge"
            :color="user.perm.admin ? 'red' : 'blue'"
            inline
          >
            <v-list-item-title>
              {{ user.name }}
            </v-list-item-title>
          </v-badge>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="user.perm.admin" to="/admin" nuxt>
        <v-list-item-icon>
          <v-icon>{{ mdiCog }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>{{ mdiExitToApp }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn v-else text to="/login" nuxt>
    <v-icon left>{{ mdiAccountCircle }}</v-icon>
    Login
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import { mdiAccount, mdiCog, mdiExitToApp, mdiAccountCircle } from '@mdi/js'
import { getAvatar } from '~/utils/avatar'

export default Vue.extend({
  name: 'UserIndicator',
  data() {
    return {
      mdiAccount,
      mdiCog,
      mdiExitToApp,
      mdiAccountCircle
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userBadge'])
  },
  methods: {
    logout() {
      this.$store.set('user', null)
      this.$store.set('persist@token', '')
      this.$axios.setToken(false)
      this.$toast.success({ title: 'Bye' })
      this.$router.push('/')
    },
    getAvatar
  }
})
</script>
