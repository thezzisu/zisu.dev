import cp from 'child_process'
import path from 'path'
import fs from 'fs'
import { NuxtConfig } from '@nuxt/types'
import { NuxtOptionsBuild } from '@nuxt/types/config/build'
import { NuxtOptionsModule } from '@nuxt/types/config/module'

const APP_NAME = 'zisu.dev'
const APP_DESC = 'zisu.dev'

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

function generateBuildConfig(): NuxtOptionsBuild | undefined {
  if (process.env.VERCEL && !process.env.CI) {
    // Do not add webpack plugins when running on Vercel
    return
  }
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
  const { DefinePlugin } = require('webpack')

  const pkg = findPackage()

  return {
    plugins: [
      new MonacoWebpackPlugin(),
      new DefinePlugin({
        BUILD: JSON.stringify({
          git: getGitInfo(),
          time: Date.now(),
          version: pkg.version,
          node: process.version
        })
      })
    ]
  }
}

function generateModulesConfig(): NuxtOptionsModule[] | undefined {
  const options = [
    '@nuxt/http',
    'cookie-universal-nuxt'
    // '@nuxtjs/pwa',
  ]
  if (process.env.GTM_ID) {
    options.push('@nuxtjs/gtm')
  }
  return options
}

const config: NuxtConfig = {
  target: 'server',
  modern: true,
  head: {
    titleTemplate: '%s - zisu.dev',
    title: 'zisu.dev',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: ['~/styles/vuetify.scss', '~/styles/global.scss'],
  plugins: [
    '~/plugins/init.ts',
    '~/plugins/toast.client.ts',
    '~/plugins/shortcuts.client.ts',
    '~/plugins/swc.client.ts'
  ],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/pwa'],
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
    BG_LIGHT: process.env.BG_LIGHT || '',
    BG_DARK: process.env.BG_DARK || ''
  },
  http: {
    baseURL: process.env.API_ENDPOINT || 'https://cms.zzisu.dev'
  },
  gtm: {
    id: process.env.GTM_ID
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
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: '^https:\\/\\/res\\.zisu\\.dev',
          handler: 'NetworkFirst',
          strategyOptions: {
            cacheName: 'statically'
          }
        },
        {
          urlPattern: '^https:\\/\\/cms\\.zzisu\\.dev',
          handler: 'NetworkFirst',
          strategyOptions: {
            cacheName: 'zcms'
          }
        },
        {
          urlPattern: '^https:\\/\\/fonts\\.googleapis\\.com',
          handler: 'StaleWhileRevalidate',
          strategyOptions: {
            cacheName: 'google-fonts-stylesheets'
          }
        },
        {
          urlPattern: '^https:\\/\\/fonts\\.gstatic\\.com',
          handler: 'StaleWhileRevalidate',
          strategyOptions: {
            cacheName: 'google-fonts-webfonts'
          }
        },
        {
          urlPattern: '^https:\\/\\/(.*\\.gravatar\\.com|img\\.shields\\.io)',
          handler: 'NetworkFirst',
          strategyOptions: {
            cacheName: '3rd-img'
          }
        }
      ]
    }
  },
  loading: {
    color: '#3498db'
  },
  build: generateBuildConfig(),
  modules: generateModulesConfig()
}

export default config
