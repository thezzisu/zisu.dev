import cp from 'child_process'
import path from 'path'
import fs from 'fs'
import { NuxtConfig } from '@nuxt/types'
import { DefinePlugin } from 'webpack'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

const APP_NAME = 'zisu.dev'
const APP_DESC = 'zisu.dev'

// #region Helper functions

function run(cmd: string) {
  return cp.execSync(cmd).toString().trim()
}

function getGitInfo() {
  return {
    branch: run('git rev-parse --abbrev-ref HEAD'),
    hash: run('git rev-parse --short HEAD')
  }
}

function findPackage() {
  const name = 'package.json'
  if (process.env.VERCEL) {
    let cur = __dirname
    while (!fs.existsSync(path.join(cur, name))) cur = path.join(cur, '..')
    return require(path.join(cur, name))
  }
  return require(path.join(__dirname, name))
}

// #endregion

// #region main config

const config: NuxtConfig = {
  target: 'static',
  modern: true,
  components: false,
  head: {
    titleTemplate: '%s - zisu.dev',
    title: 'zisu.dev',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: []
  },
  css: [
    '~/styles/vuetify.scss',
    '~/styles/global.scss'
    //
  ],
  plugins: [
    '~/plugins/persist-state.client.ts',
    '~/plugins/theme.client.ts',
    '~/plugins/toast.client.ts',
    '~/plugins/shortcuts.client.ts',
    '~/plugins/swc.client.ts'
  ],
  modules: [
    '@nuxt/content'
    //
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
    //
  ],
  build: {
    plugins: [
      // @ts-ignore
      new MonacoWebpackPlugin(),
      // @ts-ignore
      new DefinePlugin({
        BUILD: JSON.stringify({
          git: getGitInfo(),
          time: Date.now(),
          version: findPackage().version,
          node: process.version
        })
      })
    ]
  },
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || ''
  },
  axios: {
    baseURL: process.env.API_ENDPOINT,
    progress: false
  },
  vuetify: {
    customVariables: ['~/styles/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg',
      values: {}
    }
  },
  pwa: {
    meta: {
      name: APP_NAME,
      description: APP_DESC,
      theme_color: '#2c3e50'
    },
    manifest: {
      name: APP_NAME,
      short_name: APP_NAME,
      description: APP_DESC,
      background_color: '#2c3e50'
    }
  },
  loading: {
    color: '#3498db'
  }
}

// #endregion

if (process.env.CF_BEACON_TOKEN) {
  // @ts-ignore
  config.head.script.push({
    defer: true,
    src: 'https://static.cloudflareinsights.com/beacon.min.js',
    'data-cf-beacon': `{"token": "${process.env.CF_BEACON_TOKEN}"}`,
    body: true
  })
}

export default config
