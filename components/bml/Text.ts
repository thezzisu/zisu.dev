import Vue from 'vue'
import md from '~/utils/markdown'

export default Vue.extend({
  name: 'BmlText',
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
        class: [ctx.data.class],
        domProps: {
          innerHTML: md.utils
            .escapeHtml(ctx.props.value)
            .replace(/\n/g, '<br/>')
        }
      })
    )
  }
})
