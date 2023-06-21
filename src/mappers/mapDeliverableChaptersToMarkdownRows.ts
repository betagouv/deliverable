import { DeliverableChapter } from '../types'
import { formatRawMarkdownToMarkdownRows } from './formatRawMarkdownToMarkdownRows.js'

export function mapDeliverableChaptersToMarkdownRows(deliverableChapters: DeliverableChapter[]): string[] {
  return deliverableChapters.reduce((previousMarkdownRows, deliverableChapter) => {
    return deliverableChapter.body
      ? [
          ...previousMarkdownRows,
          ...(previousMarkdownRows.length > 0 ? [''] : []),
          `## ${deliverableChapter.title}`,
          '',
          ...formatRawMarkdownToMarkdownRows(deliverableChapter.body),
        ]
      : [...previousMarkdownRows, `- ${deliverableChapter.title}`]
  }, [] as string[])
}
