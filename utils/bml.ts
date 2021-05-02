export interface IBmlBlock {
  tag: string
  value: string
  id?: string
  props?: Record<string, any>
}

export function parse(bml: string) {
  if (typeof bml !== 'string' || !bml) return []

  const lines = bml.split('\n')
  const blocks: IBmlBlock[] = []

  let cur: IBmlBlock | undefined
  let contentLines: string[] = []
  let textLines: string[] = []

  function finalizeTextBlock() {
    if (textLines.length) {
      while (textLines.length && !textLines[textLines.length - 1].trim())
        textLines.pop()
      blocks.push({
        tag: 'text',
        value: textLines.join('\n')
      })
      textLines = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (cur) {
      const m = line.match(/^<\/\s*([a-zA-Z]+)(?:\[(\w+)\])?\s*>/)
      if (m && m[1] === cur.tag && m[2] === cur.id) {
        cur.value = contentLines.join('\n')
        blocks.push(cur)
        cur = undefined
        contentLines = []
      } else {
        contentLines.push(line)
      }
    } else {
      const m = line.match(
        /^<\s*([a-zA-Z]+)(?:\[(\w+)\])?((?:\s+(?:[a-zA-Z]+)(?:\s*=\s*[\S]+)?)*)\s*>/
      )
      if (m && m[1]) {
        finalizeTextBlock()

        const [, tag, id, attrs] = m
        const props: Record<string, any> = {}
        if (attrs) {
          const result = attrs.matchAll(
            /(?:\s+([a-zA-Z]+)(?:\s*=\s*([\S]+))?)/g
          )
          for (const m of result) {
            const [, key, value] = m
            if (value === undefined) {
              props[key] = true
            } else {
              props[key] = JSON.parse(value)
            }
          }
        }
        cur = {
          tag,
          id,
          props,
          value: ''
        }
      } else if (!line.startsWith('//')) {
        if (textLines.length || line.trim()) {
          textLines.push(line)
        }
      }
    }
  }
  finalizeTextBlock()
  return blocks
}

export const MonarchDefination = {
  defaultToken: '',
  tokenPostfix: '.bml',
  ignoreCase: false,
  tokenizer: {
    root: [
      [
        /(<)((?:[\w-]+:)?[\w-]+)(\s*)(\/>)/,
        ['delimiter', 'tag', '', 'delimiter']
      ],
      [
        /(<)(code(?:\[[\w-]+\])?)/,
        ['delimiter', { token: 'tag', next: '@code.$2' }]
      ],
      [
        /(<)(md(?:\[[\w-]+\])?)/,
        ['delimiter', { token: 'tag', next: '@md.$2' }]
      ],
      [
        /(<)((?:[\w-]+:)?[\w-]+)/,
        ['delimiter', { token: 'tag', next: '@otherTag' }]
      ],
      [
        /(<\/)((?:[\w-]+:)?[\w-]+)/,
        ['delimiter', { token: 'tag', next: '@otherTag' }]
      ],
      [/</, 'delimiter'],
      [/[^<]+/] // text
    ],

    otherTag: [
      [/\/?>/, 'delimiter', '@pop'],
      [/"([^"]*)"/, 'attribute.value'],
      [/'([^']*)'/, 'attribute.value'],
      [/[\w-]+/, 'attribute.name'],
      [/=/, 'delimiter'],
      [/[ \t\r\n]+/] // whitespace
    ],

    // -- BEGIN <code> tags handling

    // After <code
    code: [
      [/lang/, 'attribute.name', '@codeAfterType.$S2'],
      [/"([^"]*)"/, 'attribute.value'],
      [/'([^']*)'/, 'attribute.value'],
      [/[\w-]+/, 'attribute.name'],
      [/=/, 'delimiter'],
      [
        />/,
        { token: 'delimiter', next: '@codeEmbedded.$S2', nextEmbedded: 'txt' }
      ],
      [/[ \t\r\n]+/], // whitespace
      [
        /(<\/)(code(?:\[[\w-]+\])?)(>)/,
        ['delimiter', 'tag', { token: 'delimiter', next: '@pop' }]
      ]
    ],

    // After <code ... lang
    codeAfterType: [
      [/=/, 'delimiter', '@codeAfterTypeEquals.$S2'],
      [
        />/,
        { token: 'delimiter', next: '@codeEmbedded.$S2', nextEmbedded: 'txt' }
      ],
      [/[ \t\r\n]+/], // whitespace
      [
        /<\/(code(?:\[[\w-]+\])?)/,
        {
          cases: {
            '$1==$S2': { token: '@rematch', next: '@pop' },
            '@default': ''
          }
        }
      ]
    ],

    // After <code ... lang =
    codeAfterTypeEquals: [
      [
        /"([^"]*)"/,
        { token: 'attribute.value', switchTo: '@codeWithCustomType.$S2.$1' }
      ],
      [
        /'([^']*)'/,
        { token: 'attribute.value', switchTo: '@codeWithCustomType.$S2.$1' }
      ],
      [/>/, { token: 'delimiter', next: '@codeEmbedded', nextEmbedded: 'txt' }],
      [/[ \t\r\n]+/], // whitespace
      [
        /<\/(code(?:\[[\w-]+\])?)/,
        {
          cases: {
            '$1==$S2': { token: '@rematch', next: '@pop' },
            '@default': ''
          }
        }
      ]
    ],

    // After <code ... lang = $S3
    codeWithCustomType: [
      [
        />/,
        {
          token: 'delimiter',
          next: '@codeEmbedded.$S2.$S3',
          nextEmbedded: '$S3'
        }
      ],
      [/"([^"]*)"/, 'attribute.value'],
      [/'([^']*)'/, 'attribute.value'],
      [/[\w-]+/, 'attribute.name'],
      [/=/, 'delimiter'],
      [/[ \t\r\n]+/], // whitespace
      [
        /<\/(code(?:\[[\w-]+\])?)/,
        {
          cases: {
            '$1==$S2': { token: '@rematch', next: '@pop' },
            '@default': ''
          }
        }
      ]
    ],

    codeEmbedded: [
      [
        /<\/(code(?:\[[\w-]+\])?)/,
        {
          cases: {
            '$1==$S2': {
              token: '@rematch',
              next: '@pop',
              nextEmbedded: '@pop'
            },
            '@default': ''
          },
          token: '@rematch',
          next: '@pop',
          nextEmbedded: '@pop'
        }
      ],
      // A rule that's impossible to effect - https://github.com/microsoft/monaco-editor/issues/1598
      [
        /<\/(code(?:\[[\w-]+\])?)/,
        { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }
      ],
      [/[^<]+/, '']
    ],

    // -- END <code> tags handling

    // -- BEGIN <md> tags handling
    // After <code
    md: [
      [/"([^"]*)"/, 'attribute.value'],
      [/'([^']*)'/, 'attribute.value'],
      [/[\w-]+/, 'attribute.name'],
      [/=/, 'delimiter'],
      [
        />/,
        {
          token: 'delimiter',
          next: '@mdEmbedded.$S2',
          nextEmbedded: 'markdown'
        }
      ],
      [/[ \t\r\n]+/], // whitespace
      [
        /(<\/)(md(?:\[[\w-]+\])?)(>)/,
        ['delimiter', 'tag', { token: 'delimiter', next: '@pop' }]
      ]
    ],

    mdEmbedded: [
      [
        /<\/(md(?:\[[\w-]+\])?)/,
        {
          cases: {
            '$1==$S2': {
              token: '@rematch',
              next: '@pop',
              nextEmbedded: '@pop'
            },
            '@default': ''
          }
        }
      ],
      // A rule that's impossible to effect - https://github.com/microsoft/monaco-editor/issues/1598
      [
        /<\/(md(?:\[[\w-]+\])?)/,
        { token: '@rematch', next: '@pop', nextEmbedded: '@pop', log: '$S0' }
      ],
      [/[^<]+/, '']
    ]
    // -- END <md> tags handling
  }
}
