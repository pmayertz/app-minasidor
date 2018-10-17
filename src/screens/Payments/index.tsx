import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { PaymentFilter } from '../../payments/PaymentFilter';
import Payment from '../../components/Payment';

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {
  payments: IPayment[]
}

export default class Payments extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      payments: PaymentFilter.nextPayment(props.navigation.getParam('payments', null) as IPayments) 
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Kommande</Text>
        <FlatList
          data={this.state.payments}
          renderItem={(item) => <Payment item />}
          keyExtractor={(item, _) => String(item.specifikation)}
        />
        <Text style={styles.title}>Historiska</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600'
  }
})
