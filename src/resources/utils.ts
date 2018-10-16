export function invalidPersonalNumber(personalNumber: string): boolean {
  return !(/^\d{8}[-|(\s)]{0,1}[-]\d{4}$/.test(personalNumber))
}