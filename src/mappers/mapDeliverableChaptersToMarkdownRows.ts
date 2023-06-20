import { DeliverableChapter } from '../types'
import { formatRawMarkdownToMarkdownRows } from './formatRawMarkdownToMarkdownRows.js'

export function mapDeliverableChaptersToMarkdownRows(deliverableChapters: DeliverableChapter[]): string[] {
  return deliverableChapters.reduce((markdownRows, deliverableChapter) => {
    return deliverableChapter.body
      ? [
          ...(markdownRows.length > 0 ? [''] : []),
          `## ${deliverableChapter.title}`,
          '',
          ...formatRawMarkdownToMarkdownRows(deliverableChapter.body),
        ]
      : [...markdownRows, `- ${deliverableChapter.title}`]
  }, [] as string[])
}
