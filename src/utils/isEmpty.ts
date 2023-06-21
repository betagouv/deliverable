export function isEmpty(value: Array<any> | string | null | undefined): boolean {
  return Array.isArray(value) ? value.length === 0 : value === null || value === undefined || value.trim().length === 0
}
