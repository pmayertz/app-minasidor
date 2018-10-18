import React from 'react'
import { TextInput as DefaultTextInput, StyleSheet, TextInputProperties } from 'react-native'

interface ITextInputProps extends TextInputProperties {
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
