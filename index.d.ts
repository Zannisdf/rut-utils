/**
 *
 * @param {string|number} input
 * @param {object} [options={}]
 * @param {'standard'|'any'|'dashOnly'|'noSymbols'} options.formatType - defaults to ``standard``
 * @returns A detailed representation of the given input.
 */
export function toJSON(input: string | number, { formatType }?: {
    formatType: 'standard' | 'any' | 'dashOnly' | 'noSymbols';
}): {
    digit: string;
    formattedValue: string;
    isFormatValid: boolean;
    isValid: boolean;
    serial: string;
};
/**
 *
 * @param {string|number} input - Any string or number
 * @param {'standard'|'dashOnly'|'noSymbols'} [formatType="standard"] - One of the listed strings. Defaults to ``standard``
 * @returns {string} String formatted according to the ``formatType`` param.
 * Removes any invalid character before applying the format.
 *
 * @example
 * format('108646292') // => '10.864.629-2'
 * format('108646292', 'dashOnly') // => '10864629-2'
 * format('10.864.629-2', 'noSymbols') // => '108646292'
 */
export function format(input: string | number, formatType?: 'standard' | 'dashOnly' | 'noSymbols'): string;
/**
 *
 * @param {string|number} input - Any string or number
 * @param {'any'|'standard'|'dashOnly'|'noSymbols'} [formatType="any"] - One of the listed strings. Defaults to ``'any'``.
 * @returns {boolean} Returns true when ``input`` matches the given ``formatType`` or any of them if ``formatType='any'`` is given, otherwise false.
 * @example
 * isFormatValid('108646292', 'standard') // => false
 * isFormatValid('108646292', 'any') // => true
 * isFormatValid('108646292', 'noSymbols') // => true
 */
export function isFormatValid(input: string | number, formatType?: 'any' | 'standard' | 'dashOnly' | 'noSymbols'): boolean;
/**
 *
 * @param {string|number} input
 * @returns {boolean} Returns true when the given input has only valid characters
 * is of length two or greater and its digit is valid for the serial number.
 * Does not validate neither max length nor input format.
 * @example
 * isValid('108646292') // => true
 * isValid('10.864.629-2') // => true
 * isValid('111') // => false
 * isValid('1n1') // => false
 */
export function isValid(input: string | number): boolean;
