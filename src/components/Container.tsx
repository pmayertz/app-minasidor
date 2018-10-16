import React from 'react'
import { View, StyleSheet } from 'react-native'

interface IContainerProps {
  children?: JSX.Element[]
  style?: object
}

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#DCE7F1'
  }
})

export default ({ children, style }: IContainerProps) => (
  <View style={[defaultStyles.container, style]}>{children}</View>
)
