export default class PersonalNumberFilter {
  public static invalidFormat(personalNumber: string): boolean {
    return !/^\d{8}[-|(\s)]{0,1}[-]\d{4}$/.test(personalNumber)
  }
}
