import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { PaymentFilter } from '../payments/PaymentFilter';
import PaymentDetail from '../components/PaymentDetail';

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {
  payments: IPayment[]
}

export default class PaymentDetails extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      payments: PaymentFilter.nextPayment(props.navigation.getParam('payments', []) as IPayments) 
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.payments}
          renderItem={({item}) => <PaymentDetail payment={item}/>}
          keyExtractor={(item, index) => String(item.specifikation)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1',
  }
})
