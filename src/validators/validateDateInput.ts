import dayjs from 'dayjs'
import { isEmpty } from 'ramda'

export function validateDateInput(rawDateAsStringInput: string): boolean | string {
  const dateAsStringInput = rawDateAsStringInput.trim()

  if (isEmpty(dateAsStringInput)) {
    return true
  }

  if (!dayjs(dateAsStringInput).isValid()) {
    return 'Invalid date format. It must either be "YYYY/MM/DD", "YYYY/MM", or left empty.'
  }

  return true
}
