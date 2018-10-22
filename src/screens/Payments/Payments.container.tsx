import React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { PaymentFilter } from '../../payments/PaymentFilter'
import Payment from '../../components/Payment'
import PaymentsScreen from './Payments.screen'

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {
  prelAndDone: IPayment[]
  history: IPayment[]
}

export default class PaymentsContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      prelAndDone: [],
      history: []
    }
  }

  public componentDidMount() {
    this.getPayments(this.props.navigation.getParam('payments', null))
  }

  private getPayments(payments: IPayments) {
    if (!payments) {
      return
    }

    const prelAndDone = PaymentFilter.sortAscending(
      PaymentFilter.concatPrelAndDone(payments)
    )
    const history = PaymentFilter.sortDescending(payments.tidigare)

    prelAndDone.forEach(payment => {
      payment.detaljer.forEach(detail => {
        detail.delformanKlartext = PaymentFilter.getDelforman(detail)
      })
    })

    history.forEach(payment => {
      payment.detaljer.forEach(detail => {
        detail.delformanKlartext = PaymentFilter.getDelforman(detail)
      })
    })

    this.setState({
      prelAndDone,
      history
    })
  }

  public render = () => (
    <PaymentsScreen
      prelAndDone={this.getPrelAndDoneElements()}
      history={this.getHistoryElements()}
    />
  )

  private getPrelAndDoneElements(): JSX.Element[] {
    return this.state.prelAndDone.map((data, key) => (
      <Payment key={key} payment={data} />
    ))
  }

  private getHistoryElements(): JSX.Element[] {
    return this.state.history.map((data, key) => (
      <Payment key={key} payment={data} />
    ))
  }
}
