/**
 * Returns an object containing the rut details.
 */
export function toJSON(
  input: string | number,
  options: {
    formatType: 'any' | 'standard' | 'dashOnly' | 'noSymbols' = 'any'
  } = {}
): {
  digit: string
  formattedValue: string
  isFormatValid: boolean
  isValid: boolean
  serial: string
}

/**
 * Returns a new string in the given format.
 *
 * @example
 * format('108646292') // => '10.864.629-2'
 * format('108646292', 'standard') // => '10.864.629-2'
 * format('108646292', 'dashOnly') // => '10864629-2'
 * format('108646292', 'noSymbols') // => '108646292'
 */
export function format(
  input: string | number,
  formatType: 'standard' | 'dashOnly' | 'noSymbols' = 'standard'
): string

/**
 * Returns true when the ``input``'s format matches the given ``formatType``,
 * or when it matches any of them if ``any`` is passed.
 * Otherwise returns false.
 *
 * @example
 * isFormatValid('108646292', 'any') // => true
 * isFormatValid('10864629-2', 'any') // => true
 * isFormatValid('10.864.629-2', 'any') // => true
 * isFormatValid('10.864.629-2', 'standard') // => true
 * isFormatValid('10864629-2', 'standard') // => false
 * isFormatValid('108646292', 'standard') // => false
 */
export function isFormatValid(
  input: string | number,
  formatType: 'any' | 'standard' | 'dashOnly' | 'noSymbols' = 'any'
): boolean

/**
 * Returns true if ``input`` only contains digits, dots and/or dashes,
 * is longer than one char and the verification digit is valid for the
 * serial number. Otherwise returns false.
 *
 * Does not validate neither the ``input``s format nor its max length.
 */
export function isValid(input: string | number): boolean
