import Vue from 'vue'
import { IBmlBlock } from '~/utils/bml'
import Text from '~/components/bml/Text'
import Code from '~/components/bml/Code'
import Markdown from '~/components/bml/Markdown'

const map: Record<string, any> = {
  text: Text,
  code: Code,
  md: Markdown
}

function getComponent(tag: string) {
  if (tag in map) return map[tag]
  return 'div'
}

export default Vue.extend({
  name: 'BmlBlock',
  functional: true,
  props: {
    block: {
      type: Object,
      required: true
    },
    html: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props, data }) {
    const block: IBmlBlock = props.block
    return h('div', {}, [
      h(getComponent(block.tag), {
        ...data,
        props: {
          ...block.props,
          value: block.value,
          html: props.html
        }
      })
    ])
  }
})
