import MarkdownIt from 'markdown-it'
import katex from 'markdown-it-katex'
import Prism from '~/utils/prism'
import 'katex/dist/katex.min.css'
import '~/styles/markdown.scss'

export default function (options: MarkdownIt.Options = {}) {
  const md = new MarkdownIt(options)

  md.use(katex, { throwOnError: false, errorColor: ' #cc0000' })
  md.options.highlight = (code, lang) => {
    const prismLanguage = Prism.languages[lang]
    const className = lang ? `language-${lang}` : ''

    if (process.env.NODE_ENV === 'development' && lang && !prismLanguage) {
      // eslint-disable-next-line no-console
      console.warn(`Prism component for language "${lang}" was not found`)
    }

    const rendered = prismLanguage
      ? // @ts-expect-error
        Prism.highlight(code, prismLanguage)
      : md.utils.escapeHtml(code)
    return `<pre class="${className}"><code class="${className}">${rendered}</code></pre>`
  }
  return md
}
