<template>
  <v-dialog v-model="display" width="unset">
    <template #activator="{ on }">
      <v-text-field
        :disabled="disabled"
        :loading="loading"
        :label="label"
        :value="datetime"
        readonly
        v-on="on"
      />
    </template>

    <v-card>
      <v-tabs>
        <v-tab>Date</v-tab>
        <v-tab-item>
          <v-date-picker v-model="date" />
        </v-tab-item>
        <v-tab>Time</v-tab>
        <v-tab-item>
          <v-time-picker v-model="time" use-seconds />
        </v-tab-item>
      </v-tabs>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green" dark @click="now">Now</v-btn>
        <v-btn color="error" @click="cancel">Cancel</v-btn>
        <v-btn color="primary" @click="update">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { toISODateString, toISOTimeString } from '~/utils/dates'

export default Vue.extend({
  name: 'DateEditor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      display: false,
      date: '',
      time: ''
    }
  },
  computed: {
    datetime(): string {
      return `${this.date} ${this.time}`
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.reset()
      }
    }
  },
  methods: {
    reset() {
      const date = new Date(this.value)
      this.date = toISODateString(date)
      this.time = toISOTimeString(date)
    },
    update() {
      this.$emit('change', +new Date(this.datetime))
      this.close()
    },
    now() {
      this.$emit('change', +new Date())
      this.close()
    },
    cancel() {
      this.reset()
      this.close()
    },
    close() {
      this.display = false
    }
  }
})
</script>
