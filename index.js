// Valid rut formats
const STANDARD = 'standard' // 11.222.333-4
const DASH_ONLY = 'dashOnly' // 11222333-4
const NO_SYMBOLS = 'noSymbols' // 112223334

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

// Format related functions

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

function isFormatValid(input, formatType = 'any') {
  return getFormatExpressions(formatType).reduce(
    (isValid, exp) => isValid || exp.test(input),
    false
  )
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

function isValid(input) {
  const cleanInput = removeInvalidChars(input)

  return (
    hasOnlyValidChars(input) &&
    hasMinLength(cleanInput) &&
    isDigitValid(split(cleanInput))
  )
}

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
