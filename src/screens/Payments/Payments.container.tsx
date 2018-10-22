import React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { PaymentFilter } from '../../payments/PaymentFilter'
import Payment from '../../components/Payment'
import PaymentsScreen from './Payments.screen'
import * as Rest from '../../Rest'

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
    const payments: IPayments = this.props.navigation.getParam('payments', null)
    this.setState({
      prelAndDone: PaymentFilter.sortAscending(
        PaymentFilter.concatPrelAndDone(payments)
      ),
      history: PaymentFilter.sortDescending(payments.tidigare)
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
      <Payment key={key} payment={data} onPress={() => this.showPdf(data.specifikation)}/>
    ))
  }

  private getHistoryElements(): JSX.Element[] {
    return this.state.history.map((data, key) => (
      <Payment key={key} payment={data} onPress={() => this.showPdf(data.specifikation)}/>
    ))
  }

  private showPdf(specification: number) {
    Rest.getPdf(specification)
    .then((path) => {
      this.props.navigation.navigate('PdfScreen', {
        source: { uri: `file://${path}` }
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
}
