import { Linking } from 'react-native'

export async function start() {
  await Linking.openURL('bankid://redirect=minasidor://BANKID_RESPONSE_KEY')
}
