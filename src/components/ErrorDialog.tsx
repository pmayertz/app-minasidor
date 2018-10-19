import React from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 8,
    backgroundColor: '#FDEAEA',
    borderColor: '#CA1515',
    borderWidth: 2
  },
  textContainer: {
    flex: 4
  },
  buttonContainer: {
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'center'
  }
})

export interface IError {
  title: string,
  subtitle: string,
  onClose(): void
}

interface IButtonProps {
  error?: IError
}

export default ({ error }: IButtonProps) =>
  error ? (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16
            }}
          >
            {error.title}
          </Text>
          <Text>{error.subtitle}</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => error.onClose()}
        >
          <Text
            style={{ textAlign: 'right', fontSize: 24, fontWeight: 'bold' }}
          >
            X
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null
