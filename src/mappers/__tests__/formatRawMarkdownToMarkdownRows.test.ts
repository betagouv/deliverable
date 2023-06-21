import { describe, expect, test } from '@jest/globals'
import { readFile } from 'fs/promises'

import { formatRawMarkdownToMarkdownRows } from '../formatRawMarkdownToMarkdownRows'

describe('formatRawMarkdownToMarkdownRows()', () => {
  test('should format input.1.md', async () => {
    const input = await readFile('./src/mappers/__tests__/__samples__/input.1.md', 'utf8')

    const result = formatRawMarkdownToMarkdownRows(input)

    const expectedOutput = await readFile('./src/mappers/__tests__/__samples__/output.1.md', 'utf8')
    expect(result.join('\n')).toBe(expectedOutput.trim())
  })
})
