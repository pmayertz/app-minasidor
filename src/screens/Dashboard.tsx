import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import PaymentCircle from '../components/PaymentCircle'
import * as Rest from '../Rest'
import { PaymentFilter } from '../payments/PaymentFilter'
import NavigationButton from '../components/NavigationButton'
import Button from '../components/Button'

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {
  payments: IPayments
}

export default class Dashboard extends React.Component<IProps, IState> {
  private static navigationOptions = {
    header: null
  }

  constructor(props: IProps) {
    super(props)
    this.state = {
      payments: { klara: [], preliminara: [], tidigare: [] }
    }
  }

  public render() {
    return (
      <ScrollView bounces={false} style={styles.container}>
        <PaymentCircle
          nextPayment={PaymentFilter.nextPaymentSum(this.state.payments)}
          onPress={() => this.navigateToPaymentDetail()}
        />
        <View style={{ marginVertical: 16, marginHorizontal: 8 }}>
          <NavigationButton
            title="Ärenden"
            icon="folder-shared"
            onPress={() => this.navigateToPayments()}
          />
          <NavigationButton
            title="Föräldrapenning"
            icon="child-friendly"
            onPress={() => this.navigateToPayments()}
          />
          <NavigationButton
            title="Utbetalningar"
            icon="account-balance"
            onPress={() => this.navigateToPayments()}
          />
          <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 16, marginBottom: 8 }}>Hur är vår nya Applikation?</Text>
          <Button
          icon="thumbs-up-down"
          title="Lämna synpunkter"
          style={{ backgroundColor: '#EEEEEE'}}
          fontStyle={{ color: '#000000' }}
          iconStyle={{ color: '#000000' }}
          onPress={() => this.navigateToReview()}
        />
        </View>
      </ScrollView>
    )
  }

  private navigateToPayments() {
    this.props.navigation.navigate('Payments', {
      payments: this.state.payments
    })
  }

  private navigateToReview() {
    this.props.navigation.navigate('Review')
  }
  private navigateToPaymentDetail() {
    this.props.navigation.navigate('PaymentDetails', {
      payments: this.state.payments
    })
  }

  public componentDidMount = () => {
    // this.setState({
    //   payments: {
    //     klara: [
    //       {
    //         nettobelopp: 5129,
    //         datum: '2018-10-28',
    //         detaljer: [],
    //         specifikation: 1,
    //         status: '',
    //         utbetalningsfamilj: '',
    //         utbetalningsfamiljKlartext: ''
    //       }
    //     ],
    //     preliminara: [],
    //     tidigare: []
    //   }
    // })
    Rest.getUtbetalningar()
      .then((responseBody: IPayments) => {
        this.setState({ payments: responseBody })
      })
      .catch(error => {
        if (error instanceof Rest.AuthenticationError) {
          this.props.navigation.navigate('Auth')
        }
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1'
  }
})
