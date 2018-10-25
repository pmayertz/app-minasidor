import PersonalNumberFilter from '../PersonalNumberFilter'

describe('PersonalNumberFilter should', () => {
  test('invalidate incorrect format', () => {
    [
      '201703152395',
      '1703152395',
      '170315-2395',
      '111111111111',
      'ADDSGBDSGDSG',
      '2017ADAS-SDGG',
      '20170315-239a'
    ].forEach((personalNumber) => {
      const isInvalid = PersonalNumberFilter.invalidFormat(personalNumber)
      expect(isInvalid).toBeTruthy()
    })
  })
  test('validate correct format', () => {
    [
      '20170315-2395'
    ].forEach((personalNumber) => {
      const isInvalid = PersonalNumberFilter.invalidFormat(personalNumber)
      expect(isInvalid).toBeFalsy()
    })
  })
})
