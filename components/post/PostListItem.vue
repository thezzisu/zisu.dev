<template>
  <v-card :outlined="outlined">
    <v-card-title>
      <div>
        <nuxt-link
          class="title"
          :to="`/post/${post.slug}`"
          nuxt
          v-text="post.title"
        />
        <div>
          <v-chip class="pa-1" small label color="transparent">
            <v-icon left>{{ mdiClockOutline }}</v-icon>
            {{ new Date(post.published).toLocaleString() }}
          </v-chip>
          <v-chip
            v-if="post.updated !== post.published"
            class="pa-1"
            small
            label
            color="transparent"
          >
            <v-icon left>{{ mdiCalendarEdit }}</v-icon>
            {{ new Date(post.updated).toLocaleString() }}
          </v-chip>
        </div>
      </div>
      <template v-if="post.priority > 0">
        <v-spacer />
        <v-chip color="red" outlined>Pinned</v-chip>
      </template>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <bml :value="post.summary" html />
    </v-card-text>
    <v-divider />
    <v-card-actions class="py-1">
      <v-btn text block small :to="`/post/${post.slug}`">Read More</v-btn>
    </v-card-actions>
    <v-divider />
    <div class="px-1">
      <tag-chip
        v-for="(tag, i) of post.tags"
        :key="i"
        class="ma-1"
        :tag="tag"
      />
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiClockOutline, mdiCalendarEdit } from '@mdi/js'
import Bml from '~/components/bml/Bml'
import TagChip from '~/components/tag/TagChip.vue'

export default Vue.extend({
  name: 'PostListItem',
  components: { TagChip, Bml },
  props: {
    post: {
      type: Object,
      required: true
    },
    outlined: {
      type: Boolean
    }
  },
  data() {
    return {
      mdiClockOutline,
      mdiCalendarEdit
    }
  }
})
</script>
