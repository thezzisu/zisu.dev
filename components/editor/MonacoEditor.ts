import Vue from 'vue'
import { MonarchDefination } from '~/utils/bml'

export default Vue.extend({
  name: 'MonacoEditor',
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
  data() {
    return {
      editor: null as any,
      monaco: {} as typeof import('monaco-editor')
    }
  },
  watch: {
    value(val: string) {
      if (val !== this.editor.getValue()) {
        this.editor.setValue(val)
      }
    },
    language(val: string) {
      const model = this.editor.getModel()
      if (model) {
        this.monaco.editor.setModelLanguage(model, val)
      }
    },
    theme(val: string) {
      this.monaco.editor.setTheme(val)
    },
    readonly(val: boolean) {
      this.editor.updateOptions({ readOnly: val })
    }
  },
  mounted() {
    this.initMonaco()
    this.$on('hook:beforeDestroy', () => {
      this.editor!.dispose()
    })
  },
  methods: {
    initMonaco() {
      const options = {
        value: this.value,
        theme: this.theme || (this.$vuetify.theme.dark ? 'vs-dark' : 'vs'),
        language: this.language,
        automaticLayout: true,
        readOnly: this.readonly
      }
      this.monaco = require('monaco-editor')
      this.monaco.languages.register({ id: 'bml' })
      this.monaco.languages.setMonarchTokensProvider(
        'bml',
        MonarchDefination as any
      )
      this.editor = this.monaco.editor.create(this.$el as any, options)
      this.$emit('editorDidMount', this.editor)
      this.editor.onContextMenu((ev: any) => this.$emit('contextMenu', ev))
      this.editor.onDidBlurEditorText(() => this.$emit('blurText'))
      this.editor.onDidChangeConfiguration((ev: any) =>
        this.$emit('configuration', ev)
      )
      this.editor.onDidChangeCursorPosition((ev: any) =>
        this.$emit('position', ev)
      )
      this.editor.onDidChangeCursorSelection((ev: any) =>
        this.$emit('selection', ev)
      )
      this.editor.onDidChangeModel((ev: any) => this.$emit('model', ev))
      this.editor.onDidChangeModelContent((ev: any) => {
        const value = this.editor!.getValue()
        if (this.value !== value) {
          this.$emit('input', value, ev)
        }
      })
      this.editor.onDidChangeModelDecorations((ev: any) =>
        this.$emit('modelDecorations', ev)
      )
      this.editor.onDidChangeModelLanguage((ev: any) =>
        this.$emit('modelLanguage', ev)
      )
      this.editor.onDidChangeModelOptions((ev: any) =>
        this.$emit('modelOptions', ev)
      )
      this.editor.onDidDispose(() => this.$emit('afterDispose'))
      this.editor.onDidFocusEditorText(() => this.$emit('focusText'))
      this.editor.onDidLayoutChange((ev: any) => this.$emit('layout', ev))
      this.editor.onDidScrollChange((ev: any) => this.$emit('scroll', ev))
      this.editor.onKeyDown((ev: any) => this.$emit('keydown', ev))
      this.editor.onKeyUp((ev: any) => this.$emit('keyup', ev))
      this.editor.onMouseDown((ev: any) => this.$emit('mouseDown', ev))
      this.editor.onMouseLeave((ev: any) => this.$emit('mouseLeave', ev))
      this.editor.onMouseMove((ev: any) => this.$emit('mouseMove', ev))
      this.editor.onMouseUp((ev: any) => this.$emit('mouseUp', ev))
    },

    getEditor(): any {
      return this.editor
    },

    focus() {
      this.editor!.focus()
    }
  },
  render(h) {
    return h('div', { class: 'z-editor-monaco' })
  }
})
