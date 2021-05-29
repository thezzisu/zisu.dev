import Vue from 'vue'
import { parse } from '~/utils/bml'
import Block from '~/components/bml/Block'

export default Vue.extend({
  name: 'Bml',
  functional: true,
  props: {
    value: {
      type: String,
      required: true
    },
    html: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props, data }) {
    const blocks = parse(props.value)
    return h(
      'div',
      { ...data, class: 'bml-root' },
      blocks.map((block) => h(Block, { props: { block, html: props.html } }))
    )
  }
})
