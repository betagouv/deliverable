import dayjs from 'dayjs'
import { isEmpty } from 'ramda'

export function validateDateInput(rawDateAsStringInput: string): boolean | string {
  const dateAsStringInput = rawDateAsStringInput.trim()

  if (isEmpty(dateAsStringInput)) {
    return true
  }

  if (!/^20\d{2}\/?[0-1][0-9]$/.test(dateAsStringInput)) {
    return 'Invalid date format. It must either be "YYYY/MM", "YYYYMM", or left empty.'
  }

  if (!dayjs(dateAsStringInput).isValid()) {
    return 'Unable to parse this date. It must either be "YYYY/MM", "YYYYMM", or left empty.'
  }

  if (dayjs(dateAsStringInput).isAfter(dayjs())) {
    return 'This date is in the future. It can only be in the past.'
  }

  return true
}
