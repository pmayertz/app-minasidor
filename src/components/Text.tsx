import React from 'react'
import { TextProperties, Text, Platform } from 'react-native'

interface ITextProps extends TextProperties {
  children: any | undefined
}

export default (props: ITextProps) => (
  <Text
    {...props}
    style={[
      Platform.OS === 'android' && { fontFamily: 'Roboto' },
      props.style
    ]}
  >
    {props.children}
  </Text>
)
