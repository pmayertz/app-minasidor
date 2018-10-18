import React from 'react'
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { PaymentFilter } from '../../payments/PaymentFilter'
import Payment from '../../components/Payment'
import Card from '../../components/Card';

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {
  prelAndDone: IPayment[]
  history: IPayment[]
}

export default class Payments extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      prelAndDone: [],
      history: []
    }
  }

  public componentDidMount() {
    const payments: IPayments = this.props.navigation.getParam('payments', null)
    this.setState({
      prelAndDone: PaymentFilter.sortByDate(
        PaymentFilter.concatPrelAndDone(payments)
      ),
      history: PaymentFilter.sortByDate(payments.tidigare)
    })
  }

  public render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Kommande</Text>
        {this.state.prelAndDone.length === 0 && (
          <Card style={{ padding: 16, marginBottom: 16 }}>
            <Text style={{ fontSize: 18 }}>
              Du har inte några kommande utbetalningar för tillfället
            </Text>
          </Card>
        )}
        {this.state.prelAndDone.map((data, key) => (
          <Payment key={key} payment={data} />
        ))}
        <Text style={styles.title}>Historiska</Text>
        {this.state.history.length === 0 && (
          <Card style={{ padding: 16 }}>
            <Text style={{ fontSize: 18 }}>
              Du har inte några historiska utbetalningar för tillfället
            </Text>
          </Card>
        )}
        {this.state.history.map((data, key) => (
          <Payment key={key} payment={data} />
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1',
    paddingHorizontal: 8
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600'
  }
})
