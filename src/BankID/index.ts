import { Platform } from 'react-native'
import * as ios from './BankID.ios'
import android from './BankID.android'

export default Platform.select({
  ios,
  android
})
