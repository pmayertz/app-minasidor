import React from 'react'
import { TextInput as DefaultTextInput, StyleSheet } from 'react-native'

interface ITextInputProps {
  style?: object
}

const defaultStyles = StyleSheet.create({
  textInput: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    fontSize: 18
  }
})

export default (props: ITextInputProps) => (
  <DefaultTextInput {...props} style={[defaultStyles.textInput, props.style]} />
)
