import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'

interface ILogoutButtonProps {
  onPress(): void
}

const styles = StyleSheet.create({
  logout: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    padding: 16,
    textDecorationLine: 'underline'
  }
})

export default ({ onPress }: ILogoutButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.logout}>Logga ut</Text>
  </TouchableOpacity>
)
