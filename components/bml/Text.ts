import Vue from 'vue'
import Md from '~/utils/markdown'

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
    const md = Md()
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
