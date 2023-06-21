import { formatRawMarkdownToMarkdownRows } from './formatRawMarkdownToMarkdownRows.js'
import { DeliverableChapter } from '../types'
import { isEmpty } from '../utils/isEmpty.js'

export function mapDeliverableChaptersToMarkdownRows(deliverableChapters: DeliverableChapter[]): string[] {
  const hasChaptersWithBody = deliverableChapters.filter(({ body }) => !isEmpty(body)).length > 0

  return deliverableChapters.reduce(
    (previousMarkdownRows, deliverableChapter) =>
      hasChaptersWithBody
        ? // ---------------------------------------------------------------------
          // If there are chapters with both a title and a body,
          // we need to format all the chapters using a Markdown H2 titles, with a body when there is one.
          [
            ...previousMarkdownRows,

            // We skip a line between chapters, but only if there are previous chapters.
            ...(previousMarkdownRows.length > 0 ? [''] : []),

            `## ${deliverableChapter.title}`,
            // Even when there are chapters with a body, some may not have one.
            ...(deliverableChapter.body ? ['', ...formatRawMarkdownToMarkdownRows(deliverableChapter.body)] : []),
          ]
        : // ---------------------------------------------------------------------
          // Otherwise, it's just a simple Markdown list of titles.
          [...previousMarkdownRows, `- ${deliverableChapter.title}`],
    [] as string[],
  )
}
