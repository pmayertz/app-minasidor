import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

interface ILogoutButtonProps {
  onPress(): void
}

const styles = StyleSheet.create({
  logout: {
    marginTop: 10,
    padding: 16
  },
  logoutText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
})

export default ({ onPress }: ILogoutButtonProps) => (
  <TouchableOpacity style={styles.logout} onPress={onPress}>
    <Text style={styles.logoutText}>Logga ut</Text>
  </TouchableOpacity>
)
