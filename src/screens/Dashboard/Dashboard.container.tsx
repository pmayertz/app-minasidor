import React from 'react'
import { Alert, AsyncStorage } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import * as Rest from '../../Rest'
import { PaymentFilter } from '../../payments/PaymentFilter'
import PaymentsMock from './Payments.mock'
import DashboardScreen from './Dashboard.screen'

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {
  isLoading: boolean
  hasGivenFeedback: boolean
  payments: IPayments
}

export default class DashboardContainer extends React.Component<
  IProps,
  IState
> {
  private static navigationOptions = {
    header: null
  }

  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoading: false,
      hasGivenFeedback: true,
      payments: { klara: [], preliminara: [], tidigare: [] },
    }
  }

  public componentWillMount = () => {
    this.hasGivenFeedback()
  }

  public componentDidMount = () => {
    this.setState({ isLoading: true })
    //this.setState({ payments: PaymentsMock })

    Rest.getUtbetalningar()
      .then((responseBody: IPayments) => {
        this.setState({ payments: responseBody, isLoading: false })
      })
      .catch(error => {
        if (error instanceof Rest.AuthenticationError) {
          this.props.navigation.navigate('Auth')
        }
      })
  }

  public render = () => (
    <DashboardScreen
      nextPayment={PaymentFilter.nextPaymentSum(this.state.payments)}
      hasGivenFeedback={this.state.hasGivenFeedback}
      leaveFeedback={rating => this.leaveFeedback(rating)}
      navigateToPayments={() => {
        this.props.navigation.navigate('Payments', {
          payments: this.state.payments
        })
      }}
      navigateToReview={() => this.props.navigation.navigate('Review')}
    />
  )

  private async hasGivenFeedback() {
    const hasGivenFeedback = await AsyncStorage.getItem('hasGivenFeedback')
    if (hasGivenFeedback) {
      this.setState({ hasGivenFeedback: true })
    } else {
      this.setState({ hasGivenFeedback: false })
    }
  }

  private leaveFeedback(rating: number) {
    Rest.skickaEpost(rating, 'RATING')
      .then(() => AsyncStorage.setItem('hasGivenFeedback', 'yes'))
      .then(() => {
        this.setState({ isLoading: false, hasGivenFeedback: true })
        this.alertSuccess()
      })
      .catch(error => console.log(error))
  }

  private alertSuccess() {
    Alert.alert('Synpunkt skickad', 'Tack! Vi har nu tagit emot din synpunkt.')
  }
}
