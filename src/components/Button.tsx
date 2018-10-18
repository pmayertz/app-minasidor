import React from 'react'
import { TouchableHighlight, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IButtonProps {
  title?: string
  icon?: string
  onPress(): void
  style?: object
  fontStyle?: object
  iconStyle?: object
}

const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: '#116A3E',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
    borderRadius: 8,
    elevation: 1,
  },
  text: {
    color: '#EEEEEE',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  icon: {
    paddingHorizontal: 8,
    color: '#EEEEEE'
  }
})

export default ({ title, icon, onPress, style, fontStyle, iconStyle }: IButtonProps) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={[defaultStyles.button, style]}>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {icon && (<Icon name={icon} size={40} style={[defaultStyles.icon, iconStyle]} />)}
      <Text style={[defaultStyles.text, fontStyle]}>{title}</Text>
    </View>
  </TouchableOpacity>
)
