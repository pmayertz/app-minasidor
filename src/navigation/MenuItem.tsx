import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Text from '../components/Text';

interface IMenuItemProps {
  onPress(): void
  title: string
  icon: string
  style: object
}

const styles = StyleSheet.create({
  link: {
    backgroundColor: '#EEEEEE',
    padding: 16,
    elevation: 2
  },
  linkText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000'
  }
})

export default ({ onPress, title, icon, style }: IMenuItemProps) => (
  <TouchableOpacity style={[styles.link, style]} onPress={onPress}>
    <View
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <Icon name={icon} size={22} style={{ marginRight: 8 }} />
      <Text style={styles.linkText}>{title}</Text>
    </View>
  </TouchableOpacity>
)
