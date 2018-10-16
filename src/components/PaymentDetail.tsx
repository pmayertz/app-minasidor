import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

interface IPaymentDetailProps {
  payment: IPayment
}

export default ({ payment }: IPaymentDetailProps) => (
    <View style={styles.root}>
      <Text>Belopp</Text>
      <Text style={styles.amount}>{payment.nettobelopp} kr</Text> 
      <Text>Ersättning</Text>
      <Text style={styles.boldText}>Presentera payment.detaljer</Text>
      <Text>Status</Text>
      <Text style={styles.boldText}>{payment.status}</Text> 
      <Text>Datum</Text>
      <Text style={styles.boldText}>{payment.datum}</Text> 
    </View>
)

// styles
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  boldText: {
    fontWeight: 'bold'
  }
})
