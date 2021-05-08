import Vue from 'vue'
import MonacoEditor from '@/components/editor/MonacoEditor'
import BasicEditor from '@/components/editor/BasicEditor'

export default Vue.extend({
  name: 'Editor',
  functional: true,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    theme: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean
    },
    value: {
      type: String,
      required: true
    }
  },
  render(h, { data, props, listeners, parent }) {
    // @ts-expect-error
    if (parent._isMounted) {
      if (parent.$store.state.local.editor.basic) {
        return h(BasicEditor, {
          ...data,
          props,
          on: listeners
        })
      } else {
        return h(MonacoEditor, {
          ...data,
          props,
          on: listeners
        })
      }
    }

    parent.$once('hook:mounted', () => {
      parent.$forceUpdate()
    })

    return h('div', {}, ['Editor loading...'])
  }
})
