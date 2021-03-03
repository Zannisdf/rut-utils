const { format, isValid, isFormatValid, toJSON } = require('./index')

describe('isValid(input)', () => {
  it('returns true for format-compliant valid rut strings', () => {
    expect(isValid('10.864.629-2')).toBe(true)
    expect(isValid('11.726.111-5')).toBe(true)
    expect(isValid('13.067.971-4')).toBe(true)
    expect(isValid('15.223.952-1')).toBe(true)
    expect(isValid('15.496.120-8')).toBe(true)
    expect(isValid('16.003.145-k')).toBe(true)
    expect(isValid('16.158.088-0')).toBe(true)
    expect(isValid('16.931.829-8')).toBe(true)
    expect(isValid('17.577.561-7')).toBe(true)
    expect(isValid('19.791.795-4')).toBe(true)
    expect(isValid('20.181.773-0')).toBe(true)
    expect(isValid('20.309.424-8')).toBe(true)
    expect(isValid('21.705.755-8')).toBe(true)
    expect(isValid('23.023.518-k')).toBe(true)
    expect(isValid('23.559.651-2')).toBe(true)
    expect(isValid('24.261.604-9')).toBe(true)
    expect(isValid('24.901.269-6')).toBe(true)
    expect(isValid('67.091.27-2')).toBe(true)
    expect(isValid('8.1399.19-0')).toBe(true)
    expect(isValid('8.702.020-7')).toBe(true)
  })

  it('returns true for dashed valid rut strings', () => {
    expect(isValid('10864629-2')).toBe(true)
    expect(isValid('11726111-5')).toBe(true)
    expect(isValid('13067971-4')).toBe(true)
    expect(isValid('15223952-1')).toBe(true)
    expect(isValid('15496120-8')).toBe(true)
    expect(isValid('16003145-k')).toBe(true)
    expect(isValid('16158088-0')).toBe(true)
    expect(isValid('16931829-8')).toBe(true)
    expect(isValid('17577561-7')).toBe(true)
    expect(isValid('19791795-4')).toBe(true)
    expect(isValid('20181773-0')).toBe(true)
    expect(isValid('20309424-8')).toBe(true)
    expect(isValid('21705755-8')).toBe(true)
    expect(isValid('23023518-k')).toBe(true)
    expect(isValid('23559651-2')).toBe(true)
    expect(isValid('24261604-9')).toBe(true)
    expect(isValid('24901269-6')).toBe(true)
    expect(isValid('6709127-2')).toBe(true)
    expect(isValid('8139919-0')).toBe(true)
    expect(isValid('8702020-7')).toBe(true)
  })

  it('returns true for non-formatted valid rut strings', () => {
    expect(isValid('108646292')).toBe(true)
    expect(isValid('117261115')).toBe(true)
    expect(isValid('130679714')).toBe(true)
    expect(isValid('152239521')).toBe(true)
    expect(isValid('154961208')).toBe(true)
    expect(isValid('16003145k')).toBe(true)
    expect(isValid('161580880')).toBe(true)
    expect(isValid('169318298')).toBe(true)
    expect(isValid('175775617')).toBe(true)
    expect(isValid('197917954')).toBe(true)
    expect(isValid('201817730')).toBe(true)
    expect(isValid('203094248')).toBe(true)
    expect(isValid('217057558')).toBe(true)
    expect(isValid('23023518k')).toBe(true)
    expect(isValid('235596512')).toBe(true)
    expect(isValid('242616049')).toBe(true)
    expect(isValid('249012696')).toBe(true)
    expect(isValid('67091272')).toBe(true)
    expect(isValid('81399190')).toBe(true)
    expect(isValid('87020207')).toBe(true)
  })

  it('returns true for valid rut numbers', () => {
    expect(isValid(108646292)).toBe(true)
    expect(isValid(117261115)).toBe(true)
    expect(isValid(130679714)).toBe(true)
    expect(isValid(152239521)).toBe(true)
    expect(isValid(154961208)).toBe(true)
    expect(isValid(161580880)).toBe(true)
    expect(isValid(169318298)).toBe(true)
    expect(isValid(175775617)).toBe(true)
    expect(isValid(197917954)).toBe(true)
    expect(isValid(201817730)).toBe(true)
    expect(isValid(203094248)).toBe(true)
    expect(isValid(217057558)).toBe(true)
    expect(isValid(235596512)).toBe(true)
    expect(isValid(242616049)).toBe(true)
    expect(isValid(249012696)).toBe(true)
    expect(isValid(67091272)).toBe(true)
    expect(isValid(81399190)).toBe(true)
    expect(isValid(87020207)).toBe(true)
  })

  it('returns true for malformed valid rut strings that only contain accepted chars', () => {
    expect(isValid('1.0.8.6.4.6.2.9-2')).toBe(true)
    expect(isValid('1.1.7.2.6.1.1.1-5')).toBe(true)
    expect(isValid('1.3.0.6.7.9.7.1-4')).toBe(true)
    expect(isValid('1.5.2.2.3.9.5.2-1')).toBe(true)
    expect(isValid('1.5.4.9.6.1.2.0-8')).toBe(true)
    expect(isValid('1.6.0.0.3.1.4.5-k')).toBe(true)
    expect(isValid('1.6.1.5.8.0.8.8-0')).toBe(true)
    expect(isValid('1.6.9.3.1.8.2.9-8')).toBe(true)
    expect(isValid('1.7.5.7.7.5.6.1-7')).toBe(true)
    expect(isValid('1.9.7.9.1.7.9.5-4')).toBe(true)
    expect(isValid('2.0.1.8.1.7.7.3-0')).toBe(true)
    expect(isValid('2.0.3.0.9.4.2.4-8')).toBe(true)
    expect(isValid('2.1.7.0.5.7.5.5-8')).toBe(true)
    expect(isValid('2.3.0.2.3.5.1.8-k')).toBe(true)
    expect(isValid('2.3.5.5.9.6.5.1-2')).toBe(true)
    expect(isValid('2.4.2.6.1.6.0.4-9')).toBe(true)
    expect(isValid('2.4.9.0.1.2.6.9-6')).toBe(true)
    expect(isValid('6.7.0.9.1.2.7.-2')).toBe(true)
    expect(isValid('8..13.9.9.1.9.-0')).toBe(true)
    expect(isValid('8..70.2..02.0.-7')).toBe(true)
  })

  it('returns false for format-compliant invalid rut strings', () => {
    expect(isValid('10.864.629-3')).toBe(false)
    expect(isValid('11.726.111-3')).toBe(false)
    expect(isValid('13.067.971-3')).toBe(false)
    expect(isValid('15.223.952-3')).toBe(false)
    expect(isValid('15.496.120-3')).toBe(false)
    expect(isValid('16.003.145-3')).toBe(false)
    expect(isValid('16.158.088-3')).toBe(false)
    expect(isValid('16.931.829-3')).toBe(false)
    expect(isValid('17.577.561-3')).toBe(false)
    expect(isValid('19.791.795-3')).toBe(false)
    expect(isValid('20.181.773-3')).toBe(false)
    expect(isValid('20.309.424-3')).toBe(false)
    expect(isValid('21.705.755-3')).toBe(false)
    expect(isValid('23.023.518-3')).toBe(false)
    expect(isValid('23.559.651-3')).toBe(false)
    expect(isValid('24.261.604-3')).toBe(false)
    expect(isValid('24.901.269-3')).toBe(false)
    expect(isValid('67.091.27-3')).toBe(false)
    expect(isValid('8.1399.19-3')).toBe(false)
    expect(isValid('8.702.020-3')).toBe(false)
  })

  it('returns true for dashed valid rut strings', () => {
    expect(isValid('10864629-3')).toBe(false)
    expect(isValid('11726111-3')).toBe(false)
    expect(isValid('13067971-3')).toBe(false)
    expect(isValid('15223952-3')).toBe(false)
    expect(isValid('15496120-3')).toBe(false)
    expect(isValid('16003145-3')).toBe(false)
    expect(isValid('16158088-3')).toBe(false)
    expect(isValid('16931829-3')).toBe(false)
    expect(isValid('17577561-3')).toBe(false)
    expect(isValid('19791795-3')).toBe(false)
    expect(isValid('20181773-3')).toBe(false)
    expect(isValid('20309424-3')).toBe(false)
    expect(isValid('21705755-3')).toBe(false)
    expect(isValid('23023518-3')).toBe(false)
    expect(isValid('23559651-3')).toBe(false)
    expect(isValid('24261604-3')).toBe(false)
    expect(isValid('24901269-3')).toBe(false)
    expect(isValid('6709127-3')).toBe(false)
    expect(isValid('8139919-3')).toBe(false)
    expect(isValid('8702020-3')).toBe(false)
  })

  it('returns false for non-formatted invalid rut strings', () => {
    expect(isValid('108646293')).toBe(false)
    expect(isValid('117261113')).toBe(false)
    expect(isValid('130679713')).toBe(false)
    expect(isValid('152239523')).toBe(false)
    expect(isValid('154961203')).toBe(false)
    expect(isValid('160031453')).toBe(false)
    expect(isValid('161580883')).toBe(false)
    expect(isValid('169318293')).toBe(false)
    expect(isValid('175775613')).toBe(false)
    expect(isValid('197917953')).toBe(false)
    expect(isValid('201817733')).toBe(false)
    expect(isValid('203094243')).toBe(false)
    expect(isValid('217057553')).toBe(false)
    expect(isValid('230235183')).toBe(false)
    expect(isValid('235596513')).toBe(false)
    expect(isValid('242616043')).toBe(false)
    expect(isValid('249012693')).toBe(false)
    expect(isValid('67091273')).toBe(false)
    expect(isValid('81399193')).toBe(false)
    expect(isValid('87020203')).toBe(false)
  })

  it('returns false for invalid rut numbers', () => {
    expect(isValid(108646293)).toBe(false)
    expect(isValid(117261113)).toBe(false)
    expect(isValid(130679713)).toBe(false)
    expect(isValid(152239523)).toBe(false)
    expect(isValid(154961203)).toBe(false)
    expect(isValid(161580883)).toBe(false)
    expect(isValid(169318293)).toBe(false)
    expect(isValid(175775613)).toBe(false)
    expect(isValid(197917953)).toBe(false)
    expect(isValid(201817733)).toBe(false)
    expect(isValid(203094243)).toBe(false)
    expect(isValid(217057553)).toBe(false)
    expect(isValid(235596513)).toBe(false)
    expect(isValid(242616043)).toBe(false)
    expect(isValid(249012693)).toBe(false)
    expect(isValid(67091273)).toBe(false)
    expect(isValid(81399193)).toBe(false)
    expect(isValid(87020203)).toBe(false)
  })

  it('returns false for malformed valid rut strings that only contain non-accepted chars', () => {
    expect(isValid('1/0.8.6.4.6.2.9-2')).toBe(false)
    expect(isValid('1/1.7.2.6.1.1.1-5')).toBe(false)
    expect(isValid('1/3.0.6.7.9.7.1-4')).toBe(false)
    expect(isValid('1/5.2.2.3.9.5.2-1')).toBe(false)
    expect(isValid('1/5.4.9.6.1.2.0-8')).toBe(false)
    expect(isValid('1/6.0.0.3.1.4.5-k')).toBe(false)
    expect(isValid('1/6.1.5.8.0.8.8-0')).toBe(false)
    expect(isValid('1/6.9.3.1.8.2.9-8')).toBe(false)
    expect(isValid('1/7.5.7.7.5.6.1-7')).toBe(false)
    expect(isValid('1/9.7.9.1.7.9.5-4')).toBe(false)
    expect(isValid('2/0.1.8.1.7.7.3-0')).toBe(false)
    expect(isValid('2/0.3.0.9.4.2.4-8')).toBe(false)
    expect(isValid('2/1.7.0.5.7.5.5-8')).toBe(false)
    expect(isValid('2/3.0.2.3.5.1.8-k')).toBe(false)
    expect(isValid('2/3.5.5.9.6.5.1-2')).toBe(false)
    expect(isValid('2/4.2.6.1.6.0.4-9')).toBe(false)
    expect(isValid('2/4.9.0.1.2.6.9-6')).toBe(false)
    expect(isValid('6/7.0.9.1.2.7.-2')).toBe(false)
    expect(isValid('8/.13.9.9.1.9.-0')).toBe(false)
    expect(isValid('8/.70.2..02.0.-7')).toBe(false)
  })

  it('returns false for empty strings', () => {
    expect(isValid('')).toBe(false)
  })

  it('returns false for any single digit', () => {
    expect(isValid(0)).toBe(false)
    expect(isValid(1)).toBe(false)
    expect(isValid(2)).toBe(false)
    expect(isValid(3)).toBe(false)
    expect(isValid(4)).toBe(false)
    expect(isValid(5)).toBe(false)
    expect(isValid(6)).toBe(false)
    expect(isValid(7)).toBe(false)
    expect(isValid(8)).toBe(false)
    expect(isValid(9)).toBe(false)
  })

  it('returns false for inputs different than number or string', () => {
    expect(isValid(null)).toBe(false)
    expect(isValid(undefined)).toBe(false)
    expect(isValid(NaN)).toBe(false)
    expect(isValid({})).toBe(false)
    expect(isValid([])).toBe(false)
  })
})

describe('isFormatValid(input, format)', () => {
  it('returns true for format-compliant strings', () => {
    expect(isFormatValid('10.864.629-2')).toBe(true)
    expect(isFormatValid('16.003.145-k')).toBe(true)
  })

  it('returns true for dashed-only strings', () => {
    expect(isFormatValid('10864629-2')).toBe(true)
    expect(isFormatValid('16003145-k')).toBe(true)
  })

  it('returns true for strings without symbols', () => {
    expect(isFormatValid('108646292')).toBe(true)
    expect(isFormatValid('16003145k')).toBe(true)
  })

  it('returns true for format-compliant strings when format is `standard`', () => {
    expect(isFormatValid('10.864.629-2', 'standard')).toBe(true)
    expect(isFormatValid('16.003.145-k', 'standard')).toBe(true)
  })

  it('returns false for dashed-only strings when string format is `standard`', () => {
    expect(isFormatValid('10864629-2', 'standard')).toBe(false)
    expect(isFormatValid('16003145-k', 'standard')).toBe(false)
  })

  it('returns false for strings without symbols when string format is `standard`', () => {
    expect(isFormatValid('108646292', 'standard')).toBe(false)
    expect(isFormatValid('16003145k', 'standard')).toBe(false)
  })

  it('returns true for dashed-only strings when format is `dashOnly`', () => {
    expect(isFormatValid('10864629-2', 'dashOnly')).toBe(true)
    expect(isFormatValid('16003145-k', 'dashOnly')).toBe(true)
  })

  it('returns false for format-compliant strings when format is `dashOnly`', () => {
    expect(isFormatValid('10.864.629-2', 'dashOnly')).toBe(false)
    expect(isFormatValid('16.003.145-k', 'dashOnly')).toBe(false)
  })

  it('returns false for strings without symbols when string format is `dashOnly`', () => {
    expect(isFormatValid('108646292', 'dashOnly')).toBe(false)
    expect(isFormatValid('16003145k', 'dashOnly')).toBe(false)
  })

  it('returns true for strings without symbols when format is `noSymbols`', () => {
    expect(isFormatValid('108646292', 'noSymbols')).toBe(true)
    expect(isFormatValid('16003145k', 'noSymbols')).toBe(true)
  })

  it('returns false for format-compliant strings when format is `noSymbols`', () => {
    expect(isFormatValid('10.864.629-2', 'noSymbols')).toBe(false)
    expect(isFormatValid('16.003.145-k', 'noSymbols')).toBe(false)
  })

  it('returns false for dash-only strings when format is `noSymbols`', () => {
    expect(isFormatValid('10864629-2', 'noSymbols')).toBe(false)
    expect(isFormatValid('16003145-k', 'noSymbols')).toBe(false)
  })

  it('returns true for format-compliant strings when format is non-existent', () => {
    expect(isFormatValid('10.864.629-2', 'aRandomFormat')).toBe(true)
    expect(isFormatValid('16.003.145-k', 'aRandomFormat')).toBe(true)
  })

  it('returns false for dashed-only strings when format is non-existent', () => {
    expect(isFormatValid('10864629-2', 'aRandomFormat')).toBe(false)
    expect(isFormatValid('16003145-k', 'aRandomFormat')).toBe(false)
  })

  it('returns false for strings without symbols when format is non-existent', () => {
    expect(isFormatValid('108646292', 'aRandomFormat')).toBe(false)
    expect(isFormatValid('16003145k', 'aRandomFormat')).toBe(false)
  })
})

describe('format(input, formatType)', () => {
  it('returns a format-compliant formatted rut string', () => {
    expect(format('108646292')).toBe('10.864.629-2')
    expect(format(108646292)).toBe('10.864.629-2')
    expect(format('1112223334445')).toBe('111.222.333.444-5')
    expect(format('12223334')).toBe('1.222.333-4')
    expect(format('10.864.629-2')).toBe('10.864.629-2')
    expect(format('10864629-2')).toBe('10.864.629-2')
  })

  it('returns a format-compliant formatted rut string when `formatType` is `standard`', () => {
    const standard = 'standard'
    expect(format('108646292', standard)).toBe('10.864.629-2')
    expect(format(108646292)).toBe('10.864.629-2')
    expect(format('1112223334445', standard)).toBe('111.222.333.444-5')
    expect(format('12223334', standard)).toBe('1.222.333-4')
    expect(format('10.864.629-2', standard)).toBe('10.864.629-2')
    expect(format('10864629-2', standard)).toBe('10.864.629-2')
  })

  it('returns a format-compliant formatted rut string when `formatType` is invalid', () => {
    const invalidFormat = 'invalidFormat'
    expect(format('108646292', invalidFormat)).toBe('10.864.629-2')
    expect(format(108646292, invalidFormat)).toBe('10.864.629-2')
    expect(format('1112223334445', invalidFormat)).toBe('111.222.333.444-5')
    expect(format('12223334', invalidFormat)).toBe('1.222.333-4')
    expect(format('10.864.629-2', invalidFormat)).toBe('10.864.629-2')
    expect(format('10864629-2', invalidFormat)).toBe('10.864.629-2')
  })

  it("returns the given input when rut string's length is 1", () => {
    expect(format('1')).toBe('1')
  })

  it('returns a dash-only formatted rut string when `formatType` is `dashOnly`', () => {
    const dashOnly = 'dashOnly'
    expect(format('108646292', dashOnly)).toBe('10864629-2')
    expect(format(108646292, dashOnly)).toBe('10864629-2')
    expect(format('1112223334445', dashOnly)).toBe('111222333444-5')
    expect(format('12223334', dashOnly)).toBe('1222333-4')
    expect(format('10.864.629-2', dashOnly)).toBe('10864629-2')
    expect(format('10864629-2', dashOnly)).toBe('10864629-2')
  })

  it('returns a rut string without symbols when `formatType` is `noSymbols`', () => {
    const noSymbols = 'noSymbols'
    expect(format('108646292', noSymbols)).toBe('108646292')
    expect(format(108646292, noSymbols)).toBe('108646292')
    expect(format('1112223334445', noSymbols)).toBe('1112223334445')
    expect(format('12223334', noSymbols)).toBe('12223334')
    expect(format('10.864.629-2', noSymbols)).toBe('108646292')
    expect(format('10864629-2', noSymbols)).toBe('108646292')
  })
})

describe('toJSON(input, options)', () => {
  it('returns an object with the rut details', () => {
    // Valid rut, valid format
    expect(toJSON('10.864.629-2')).toStrictEqual({
      digit: '2',
      formattedValue: '10.864.629-2',
      isFormatValid: true,
      isValid: true,
      serial: '10864629',
    })

    // Valid rut, invalid format
    expect(toJSON('10864629-2')).toStrictEqual({
      digit: '2',
      formattedValue: '10.864.629-2',
      isFormatValid: false,
      isValid: true,
      serial: '10864629',
    })

    // Invalid rut, valid format
    expect(toJSON('10.864.629-3')).toStrictEqual({
      digit: '3',
      formattedValue: '10.864.629-3',
      isFormatValid: true,
      isValid: false,
      serial: '10864629',
    })

    // Invalid rut, invalid format
    expect(toJSON('10864629-3')).toStrictEqual({
      digit: '3',
      formattedValue: '10.864.629-3',
      isFormatValid: false,
      isValid: false,
      serial: '10864629',
    })
  })

  it('applies the `options.formatType` format and format validation', () => {
    // Valid formats
    expect(toJSON('10864629-2', { formatType: 'dashOnly' })).toMatchObject({
      formattedValue: '10864629-2',
      isFormatValid: true,
    })

    expect(toJSON('108646292', { formatType: 'noSymbols' })).toMatchObject({
      formattedValue: '108646292',
      isFormatValid: true,
    })

    // Invalid formats
    expect(toJSON('10.864.629-2', { formatType: 'dashOnly' })).toMatchObject({
      formattedValue: '10864629-2',
      isFormatValid: false,
    })

    expect(toJSON('10.864.629-2', { formatType: 'noSymbols' })).toMatchObject({
      formattedValue: '108646292',
      isFormatValid: false,
    })
  })

  it('returns details for inputs shorter than two characters', () => {
    expect(toJSON('1')).toStrictEqual({
      digit: '1',
      formattedValue: '1',
      isFormatValid: false,
      isValid: false,
      serial: '',
    })
  })

  it('returns details with only falsy values for malformed inputs', () => {
    const details = {
      digit: '',
      formattedValue: '',
      isFormatValid: false,
      isValid: false,
      serial: '',
    }

    expect(toJSON({})).toStrictEqual(details)
    expect(toJSON([])).toStrictEqual(details)
    expect(toJSON(null)).toStrictEqual(details)
    expect(toJSON(undefined)).toStrictEqual(details)
    expect(toJSON(NaN)).toStrictEqual(details)
  })
})
