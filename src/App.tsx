import React from 'react'
import Navigation from './navigation'
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from 'react-native'

export default () => (
  <View style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" backgroundColor="#116A3E" />
    <Navigation />
  </View>
)
