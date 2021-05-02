import Vue from 'vue'

export default Vue.extend({
  name: 'SimpleEditor',
  functional: true,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  render(h, ctx) {
    const input = (e: any) => {
      const handler = ctx.listeners.input as Function
      handler(e.target.value)
    }
    return h(
      'div',
      {
        class: 'px-2 fill-width'
      },
      [
        h('textarea', {
          domProps: { value: ctx.props.value },
          on: { input },
          class: 'z-editor-basic fill-width px-3'
        })
      ]
    )
  }
})
