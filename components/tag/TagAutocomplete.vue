<template>
  <v-autocomplete
    :value="value"
    :items="items"
    :loading="loading"
    :search-input.sync="search"
    color="white"
    item-text="title"
    item-value="_id"
    label="Choose Tag"
    return-object
    @change="$emit('change', $event)"
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TagAutocomplete',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    }
  },
  data() {
    return {
      loading: false,
      items: [],
      search: ''
    }
  },
  watch: {
    async search() {
      if (this.items.length) return
      if (this.loading) return
      this.loading = true
      await this.$toast.$wrap(async () => {
        const res: any = await this.$http.$get('/tag')
        this.items = res.items
      })
      this.loading = false
    }
  }
})
</script>