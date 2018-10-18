import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  AsyncStorage
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import PaymentCircle from '../components/PaymentCircle'
import * as Rest from '../Rest'
import { PaymentFilter } from '../payments/PaymentFilter'
import NavigationButton from '../components/NavigationButton'
import Button from '../components/Button'
import Loading from '../components/Loading'

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {
  isLoading: boolean
  hasGivenFeedback: boolean
  payments: IPayments
}

export default class Dashboard extends React.Component<IProps, IState> {
  private static navigationOptions = {
    header: null
  }

  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoading: false,
      hasGivenFeedback: false,
      payments: { klara: [], preliminara: [], tidigare: [] }
    }
  }

  public componentWillMount = () => {
    this.hasGivenFeedback()
  }

  public componentDidMount = () => {
    // this.setState({
    //   payments: {
    //     klara: [
    //       {
    //         nettobelopp: 5129,
    //         datum: '2018-11-28',
    //         detaljer: [
    //           {   
    //             delforman: '',
    //             delformanKlartext: 'Omvårdnadsbidrag',
    //             beloppstyp: '',
    //             beloppstypKlartext: '',
    //             ersattningAvdrag: ''
    //           },
    //           {   
    //             delforman: '',
    //             delformanKlartext: 'Bostadsbidrag',
    //             beloppstyp: '',
    //             beloppstypKlartext: '',
    //             ersattningAvdrag: ''
    //           }
    //         ],
    //         specifikation: 1,
    //         status: 'KLAR',
    //         utbetalningsfamilj: '',
    //         utbetalningsfamiljKlartext: ''
    //       }
    //     ],
    //     preliminara: [
    //       {
    //         nettobelopp: 5129,
    //         datum: '2018-09-28',
    //         detaljer: [
    //           {   
    //             delforman: '',
    //             delformanKlartext: 'Bostadsbidrag',
    //             beloppstyp: '',
    //             beloppstypKlartext: '',
    //             ersattningAvdrag: ''
    //           }
    //         ],
    //         specifikation: 1,
    //         status: 'PREL',
    //         utbetalningsfamilj: '',
    //         utbetalningsfamiljKlartext: ''
    //       },
    //       {
    //         nettobelopp: 2343,
    //         datum: '2018-08-28',
    //         detaljer: [
    //           {   
    //             delforman: '',
    //             delformanKlartext: 'Bostadsbidrag',
    //             beloppstyp: '',
    //             beloppstypKlartext: '',
    //             ersattningAvdrag: ''
    //           }
    //         ],
    //         specifikation: 1,
    //         status: 'PREL',
    //         utbetalningsfamilj: '',
    //         utbetalningsfamiljKlartext: ''
    //       }
    //     ],
    //     tidigare: [
    //       {
    //         nettobelopp: 1835,
    //         datum: '2015-10-28',
    //         detaljer: [
    //           {   
    //             delforman: '',
    //             delformanKlartext: 'Omvårdnadsbidrag',
    //             beloppstyp: '',
    //             beloppstypKlartext: '',
    //             ersattningAvdrag: ''
    //           },
    //           {   
    //             delforman: '',
    //             delformanKlartext: 'Bostadsbidrag',
    //             beloppstyp: '',
    //             beloppstypKlartext: '',
    //             ersattningAvdrag: ''
    //           }
    //         ],
    //         specifikation: 1,
    //         status: '',
    //         utbetalningsfamilj: '',
    //         utbetalningsfamiljKlartext: ''
    //       },
    //       {
    //         nettobelopp: 4644,
    //         datum: '2012-10-28',
    //         detaljer: [
    //           {   
    //             delforman: '',
    //             delformanKlartext: 'Bostadsbidrag',
    //             beloppstyp: '',
    //             beloppstypKlartext: '',
    //             ersattningAvdrag: ''
    //           }
    //         ],
    //         specifikation: 1,
    //         status: '',
    //         utbetalningsfamilj: '',
    //         utbetalningsfamiljKlartext: ''
    //       }
    //     ],
    //   }
    // })

    this.setState({ isLoading: true })

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

  public render() {
    return (
      <ScrollView bounces={false} style={styles.container}>
        <PaymentCircle
          nextPayment={PaymentFilter.nextPaymentSum(this.state.payments)}
          onPress={() => this.navigateToPayments()}
        />
        <View style={{ marginVertical: 16, marginHorizontal: 8 }}>
          <NavigationButton
            title="Utbetalningar"
            icon="account-balance"
            onPress={() => this.navigateToPayments()}
          />
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              marginTop: 16,
              marginBottom: 8
            }}
          >
            Hur är vår nya applikation?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 16,
              display: this.state.hasGivenFeedback ? 'none' : 'flex'
            }}
          >
            <Button
              icon="sentiment-satisfied"
              onPress={() => this.leaveFeedback(5)}
              style={{
                maxWidth: 90,
                backgroundColor: '#2ECC71',
                marginHorizontal: 8
              }}
            />
            <Button
              icon="sentiment-dissatisfied"
              onPress={() => this.leaveFeedback(1)}
              style={{
                maxWidth: 90,
                backgroundColor: '#CC2F2F',
                marginHorizontal: 8
              }}
            />
          </View>
          <Button
            icon="thumbs-up-down"
            title="Lämna synpunkter"
            style={{ backgroundColor: '#EEEEEE' }}
            fontStyle={{ color: '#000000' }}
            iconStyle={{ color: '#000000' }}
            onPress={() => this.navigateToReview()}
          />
        </View>
        <Loading isLoading={false} />
      </ScrollView>
    )
  }

  private async hasGivenFeedback() {
    const hasGivenFeedback = await AsyncStorage.getItem('hasGivenFeedback')
    if (hasGivenFeedback) {
      this.setState({ hasGivenFeedback: true })
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1'
  }
})
