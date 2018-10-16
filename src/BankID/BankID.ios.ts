import { Linking } from 'react-native'

export function start() {
  Linking.openURL('bankid://redirect=null')
}
