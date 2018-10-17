import { Linking } from 'react-native'

export function start() {
  Linking.openURL('bankid://redirect=minasidor://BANKID_RESPONSE_KEY')
}
