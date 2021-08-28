<template>
  <v-card>
    <v-card-title>
      <div>
        <div class="title" v-text="post.title" />
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
      <bml v-if="post.summary" id="_summary" :value="post.summary" html />
      <v-divider v-if="post.summary && post.content" class="my-2" />
      <bml v-if="post.content" id="_content" :value="post.content" html />
    </v-card-text>
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
  name: 'Post',
  components: { Bml, TagChip },
  props: {
    post: {
      type: Object,
      required: true
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
