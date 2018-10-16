import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import PaymentCircle from '../components/PaymentCircle'
import * as Rest from '../Rest'
import { PaymentFilter } from '../payments/PaymentFilter'

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {
  payments: IPayments
}

export default class Dashboard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      payments: {klara: [], preliminara: [],tidigare: []}
    }
  }

  private static navigationOptions = {
    header: null
  }

  public render() {
    return (
      <View style={styles.container}>
        <PaymentCircle
          nextPayment={PaymentFilter.nextPaymentSum(this.state.payments)}
          onPress={() => this.navigateToPaymentDetail()}
        />
      </View>
    )
  }

  private navigateToPaymentDetail() {
    this.props.navigation.navigate('PaymentDetails', { payments: this.state.payments})
  }

  public componentDidMount = () => {
    // this.setState({ payments: {klara: [{nettobelopp: 5129, datum: "2018-10-28", detaljer: [], specifikation: 1, status: "", utbetalningsfamilj: "", utbetalningsfamiljKlartext: ""}], preliminara: [], tidigare: []} })
    Rest.getUtbetalningar()
      .then((responseBody: IPayments) => {
        this.setState({ payments: responseBody })
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1'
  }
})
