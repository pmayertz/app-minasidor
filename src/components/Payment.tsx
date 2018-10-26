import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Card from './Card'
import Text from './Text';

interface IPaymentProps {
  payment: IPayment
  onPress(): void
}

export default ({ payment, onPress }: IPaymentProps) => (
  <Card style={styles.container}>
    <TouchableOpacity onPress={onPress} style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={[
          styles.colorBar,
          payment.status === 'KLAR' && { backgroundColor: '#669933' },
          payment.status === 'PREL' && { backgroundColor: '#FF9900' }
        ]}
      >
        <Icon name="chevron-right" size={28} color="white" />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{payment.nettobelopp}</Text>
          <Text style={{ fontWeight: 'bold' }}> kr</Text>
        </View>
        <Text style={styles.defaultText}>{payment.datum}</Text>
        <View style={styles.divider} />
        {payment.detaljer.map((detalj, key) => (
          <Text key={key}>{detalj.delformanKlartext}</Text>
        ))}
      </View>
    </TouchableOpacity>
  </Card>
)

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    flexDirection: 'row'
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flex: 1
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  defaultText: {
    fontSize: 18
  },
  divider: {
    borderWidth: 1,
    opacity: 0.4,
    marginBottom: 8
  },
  colorBar: {
    justifyContent: 'center',
    backgroundColor: 'grey'
  }
})
