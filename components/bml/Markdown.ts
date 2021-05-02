import Vue from 'vue'
import md from '~/utils/markdown'

export default Vue.extend({
  name: 'BmlMarkdown',
  functional: true,
  props: {
    value: {
      type: String,
      required: true
    }
  },
  render(h, ctx) {
    return h(
      'div',
      Object.assign({}, ctx.data, {
        class: [ctx.data.class, 'markdown-body'],
        domProps: {
          innerHTML: md.render(ctx.props.value)
        }
      })
    )
  }
})
