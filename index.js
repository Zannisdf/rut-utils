// Valid rut formats
const STANDARD = 'standard' // 11.222.333-4
const DASH_ONLY = 'dashOnly' // 11222333-4
const NO_SYMBOLS = 'noSymbols' // 112223334

/**
 * 
 * @param {string|number} input 
 * @param {object} [options={}] 
 * @param {'standard'|'any'|'dashOnly'|'noSymbols'} options.formatType - defaults to ``standard``
 * @returns A detailed representation of the given input. 
 */
function toJSON(input, { formatType = STANDARD } = {}) {
  const { digit, serial } = split(removeInvalidChars(input))

  return {
    digit,
    formattedValue: format(input, formatType),
    isFormatValid: isFormatValid(input, formatType),
    isValid: isValid(input),
    serial,
  }
}

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
function format(input, formatType = STANDARD) {
  const FORMATTERS = {
    [STANDARD]: standardFormatter,
    [DASH_ONLY]: dashOnlyFormatter,
    [NO_SYMBOLS]: noSymbolsFormatter,
    get: function (key) {
      return this[key] || this[STANDARD]
    },
  }
  input = removeInvalidChars(input)

  return hasMinLength(input) ? FORMATTERS.get(formatType)(split(input)) : input
}

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
 function isFormatValid(input, formatType = 'any') {
  return getFormatExpressions(formatType).reduce(
    (isValid, exp) => isValid || exp.test(input),
    false
  )
}

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
function isValid(input) {
  const cleanInput = removeInvalidChars(input)

  return (
    hasOnlyValidChars(input) &&
    hasMinLength(cleanInput) &&
    isDigitValid(split(cleanInput))
  )
}

// Format related functions

function standardFormatter({ serial, digit }) {
  return `${formatWithSeparators(serial)}-${digit}`
}

function dashOnlyFormatter({ serial, digit }) {
  return `${serial}-${digit}`
}

function noSymbolsFormatter({ serial, digit }) {
  return `${serial}${digit}`
}

function formatWithSeparators(serial) {
  return splitBySeparatorPosition(serial).join('.')
}

function splitBySeparatorPosition(
  serial,
  terms = [],
  breakpoint = serial.length % 3 || 3
) {
  if (serial.length == 0) {
    return terms
  }

  terms.push(serial.slice(0, breakpoint))
  return splitBySeparatorPosition(serial.slice(breakpoint), terms)
}

function getFormatExpressions(formatType) {
  const FORMATS = {
    [STANDARD]: /^\d{1,3}(\.\d{3})+-[0-9Kk]$/,
    [DASH_ONLY]: /^\d{1,3}(\d{3})+-[0-9Kk]$/,
    [NO_SYMBOLS]: /^\d+[0-9Kk]$/,
    get: function (key) {
      return this[key] || this[STANDARD]
    },
  }

  return formatType == 'any'
    ? [STANDARD, DASH_ONLY, NO_SYMBOLS].map((type) => FORMATS[type])
    : [FORMATS.get(formatType)]
}

// Validation related functions

function hasOnlyValidChars(input) {
  return !/[^0-9Kk\.-]/g.test(input)
}

function hasMinLength(rut) {
  return rut.length > 1
}

function isDigitValid({ serial, digit }) {
  return getValidDigit(serial) == digit.toUpperCase()
}

function getValidDigit(serial) {
  return parseNumericToDigit(calculateNumericDigit(serial))
}

// These constants are part of the algorithm definition. See https://es.wikipedia.org/wiki/Rol_%C3%9Anico_Tributario
function calculateNumericDigit(serial) {
  const MODULE = 11
  const MIN_FACTOR = 2
  const MAX_FACTOR = 7

  const { sum } = serial.split('').reduceRight(
    (state, char) => ({
      sum: state.sum + Number(char) * state.factor,
      factor: state.factor == MAX_FACTOR ? MIN_FACTOR : state.factor + 1,
    }),
    { sum: 0, factor: MIN_FACTOR }
  )

  return MODULE - (sum % MODULE)
}

function parseNumericToDigit(num) {
  switch (num) {
    case 10:
      return 'K'
    case 11:
      return '0'
    default:
      return Number.isNaN(num) ? null : String(num)
  }
}

// Utils

function removeInvalidChars(input) {
  return String(input).replace(/[^0-9Kk]/g, '')
}

/**
 * 
 * @param {string} rut 
 * @returns {{serial: string, digit: string}}
 */
function split(rut) {
  const lastPosition = rut.length - 1

  return {
    serial: rut.slice(0, lastPosition),
    digit: rut.slice(lastPosition),
  }
}

module.exports = {
  format,
  isFormatValid,
  isValid,
  toJSON,
}
