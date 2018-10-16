import React from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native'

interface IButtonProps {
  title: string
  onPress(): void
  style?: object
  fontStyle?: object
}

const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: '#116A3E',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
    borderRadius: 8
  },
  text: {
    color: '#EEEEEE',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default ({ title, onPress, style, fontStyle }: IButtonProps) => (
  <TouchableHighlight onPress={onPress} style={[defaultStyles.button, style]}>
    <Text style={[defaultStyles.text, fontStyle]}>{title.toUpperCase()}</Text>
  </TouchableHighlight>
)
