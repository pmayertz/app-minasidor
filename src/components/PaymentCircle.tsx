import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

interface IPaymentCircleProps {
  nextPayment: [number, string]
  onPress(): void
}

export default ({ nextPayment, onPress }: IPaymentCircleProps) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.root}>
      <View style={styles.amount}>
        <Text style={styles.text}>Preliminärt belopp:</Text>
        <Text style={[styles.text, styles.bigText, styles.shadowText]}>
          {nextPayment[0]} kr
        </Text>
      </View>
      <View style={styles.date}>
        <Text style={styles.text}>Utbetalningsdatum:</Text>
        <Text style={[styles.text, styles.mediumText, styles.shadowText]}>
          {nextPayment[1]}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
)

// styles
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#116A3E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.65,
    elevation: 6
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    paddingBottom: 10,
    fontFamily: 'arial'
  },
  mediumText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  bigText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  shadowText: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3 // TODO: does not work on android
  },
  amount: {
    padding: 10,
    borderColor: '#0c4f2d',
    borderBottomWidth: 2
  },
  date: {
    padding: 10
  }
})
