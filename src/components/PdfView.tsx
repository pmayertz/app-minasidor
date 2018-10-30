import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Pdf from 'react-native-pdf'

interface IPdfProps {
  source?: object
  onError(error: object): void
}

export default ({ source, onError }: IPdfProps) =>
  source ? (
    <View style={styles.container}>
      <Pdf
        source={source}
        onError={error => onError(error)}
        style={styles.pdf}
      />
    </View>
  ) : null

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pdf: {
    flex: 1,
    backgroundColor: '#DCE7F1',
    width: Dimensions.get('window').width
  }
})
