import Vue from 'vue'
import Md from '~/utils/markdown'

export default Vue.extend({
  name: 'BmlMarkdown',
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
  render(h, ctx) {
    const md = Md({
      html: ctx.props.html,
      linkify: true,
      typographer: true
    })
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
