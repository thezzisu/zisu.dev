import Prism from 'prismjs'
import 'prismjs/components'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-bash'
import '~/styles/prism.scss'

// @ts-expect-error
Prism.manual = true

export default Prism
