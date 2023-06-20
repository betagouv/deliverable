import { last } from 'ramda'

export function formatRawMarkdownToMarkdownRows(rawMarkdown: string): string[] {
  const cleanMarkdown = rawMarkdown
    // Remove HTML comments
    .replace(/<!--[^>]+>/g, '')
    // Replace links with their text
    .replace(/\[([^\]]*)\]\([^\]]\)/g, '$1')
    .replace(/\[([^\]]*)\]\[[^\]]\]/g, '$1')
    // Remove extra spaces
    .replace(/\s+/, ' ')

  const markdownRows = cleanMarkdown.split('\n').reduce((previousMarkdownRows, rawLine) => {
    const lastLine = last(previousMarkdownRows)
    const line = rawLine.trim()

    if (lastLine && lastLine.length === 0 && line.length === 0) {
      return previousMarkdownRows
    }

    if (line.startsWith('#') || line.startsWith('**')) {
      const normalizedLine = line
        .replace(/^#(?!#)(.*)/, '###$1')
        .replace(/^##(?!#)(.*)/, '####$1')
        .replace(/^###(?!#)(.*)/, '#####$1')

      return previousMarkdownRows.length > 0 ? [...previousMarkdownRows, '', normalizedLine] : [normalizedLine]
    }

    if (lastLine && (lastLine.startsWith('#') || lastLine.startsWith('**'))) {
      return [...previousMarkdownRows, '', line]
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      return [...previousMarkdownRows, line]
    }

    return [...previousMarkdownRows.slice(0, previousMarkdownRows.length - 1), `${lastLine} ${line}`]
  }, [] as string[])

  return markdownRows
}
