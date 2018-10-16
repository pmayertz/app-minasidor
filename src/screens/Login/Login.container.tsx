import React from 'react'
import {
  AsyncStorage,
  DeviceEventEmitter,
  DeviceEventEmitterStatic,
  EmitterSubscription
} from 'react-native'
import { BANKID_RESPONSE_KEY } from '../../resources/communication'
import BankID from '../../BankID'
import { NavigationScreenProp } from 'react-navigation'
import * as Rest from '../../Rest'
import { invalidPersonalNumber } from '../../resources/utils'
import LoginScreen from './Login.screen'
import { IError } from '../../components/ErrorDialog'

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {
  personalNumber: string
  invalidField: boolean
  isLoading: boolean
  error?: IError
}

export default class LoginContainer extends React.Component<IProps, IState> {
  private onBankIDResponse: EmitterSubscription | null

  constructor(props: IProps) {
    super(props)
    this.state = {
      personalNumber: '',
      invalidField: false,
      isLoading: false
    }
    this.onBankIDResponse = null
  }

  private getName(object: { code: number; meddelande: string }): string {
    return object.meddelande.substring(13, object.meddelande.length - 14)
  }

  public componentDidMount() {
    this.onBankIDResponse = DeviceEventEmitter.addListener(
      BANKID_RESPONSE_KEY,
      () => {
        Rest.postLaunchResponse()
          .then(response => {
            if (response.type === 'pollresponse') {
              throw new Error('Felaktig inloggning')
            }

            if (response.status) {
              throw new Error('Felaktig inloggning')
            }

            this.props.navigation.navigate('App', {
              fullname: this.getName(response)
            })
          })
          .catch(_ => {
            this.setState({ isLoading: false })
          })
      }
    )
  }

  public componentWillUnmount() {
    this.onBankIDResponse && this.onBankIDResponse.remove()
  }

  public render() {
    return (
      <LoginScreen
        onTextChange={(personalNumber: string) => {
          if (
            this.state.personalNumber.length === 7 &&
            personalNumber.length === 8
          ) {
            personalNumber += '-'
          }
          this.setState({ personalNumber })
        }}
        login={() => this.login(this.state.personalNumber)}
        invalidField={this.state.invalidField}
        personalNumber={this.state.personalNumber}
        isLoading={this.state.isLoading}
        error={this.state.error}
      />
    )
  }

  private login(personalNumber: string) {
    if (invalidPersonalNumber(personalNumber)) {
      this.setError('Ett fel har inträffat', 'Fel format på personnummer')
      this.setState({ invalidField: true })
      return
    }

    this.setState({ isLoading: true })

    Rest.login()
      .then(_ => Rest.postFormResponse(personalNumber.replace('-', '')))
      .then(_ => BankID.start())
      .catch(_ => {
        this.setState({ isLoading: false })
      })
  }

  private setError(title: string, subtitle: string) {
    this.setState({
      error: {
        title,
        subtitle,
        onClose: () => this.removeError()
      }
    })
  }

  private removeError() {
    this.setState({
      error: undefined
    })
  }
}
