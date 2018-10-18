import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 999
  },
  loadingContainer: {
    backgroundColor: 'white',
    padding: 42,
    borderRadius: 12
  }
})

interface IButtonProps {
  isLoading: boolean
}

export default ({ isLoading }: IButtonProps) =>
  isLoading ? (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#116A3E" />
      </View>
    </View>
  ) : null
