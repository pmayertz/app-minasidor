import React from 'react'
import {
  DeviceEventEmitter,
  EmitterSubscription,
  Platform,
  Linking,
  Alert
} from 'react-native'
import { BANKID_RESPONSE_KEY } from '../../shared/constants/communication'
import BankID from '../../BankID'
import { NavigationScreenProp } from 'react-navigation'
import * as Rest from '../../Rest'
import PersonalNumberFilter from '../../shared/filters/PersonalNumberFilter'
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

  private handleUrlResponse = (url: { url: string }) => {
    if (url.url.includes(BANKID_RESPONSE_KEY)) {
      this.finalizeLogin()
    }
  }

  public componentDidMount() {
    if (Platform.OS === 'ios') {
      Linking.addEventListener('url', this.handleUrlResponse)
    } else {
      this.onBankIDResponse = DeviceEventEmitter.addListener(
        BANKID_RESPONSE_KEY,
        () => this.finalizeLogin()
      )
    }
  }

  private finalizeLogin() {
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
        this.setError(
          'Inloggningen misslyckades',
          'Det har uppstått ett problem med inloggningen, var god försök igen'
        )
        this.setState({ isLoading: false })
      })
  }

  public componentWillUnmount() {
    this.onBankIDResponse && this.onBankIDResponse.remove()
    Linking.removeEventListener('url', this.handleUrlResponse)
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
    if (PersonalNumberFilter.invalidFormat(personalNumber)) {
      this.setError(
        'Fel format på personnummer',
        'Personnummer bör skrivas i format ååååddmm-nnnn'
      )
      this.setState({ invalidField: true })
      return
    }

    this.setState({ isLoading: true })

    Rest.login()
      .then(() => Rest.postFormResponse(personalNumber.replace('-', '')))
      .then(() => {
        Linking.canOpenURL('bankid://')
          .then((supported: boolean) => {
            if (!supported) {
              this.alertToInstallBankID()
            } else {
              BankID.start()
            }
          })
          .catch(() => this.alertToInstallBankID)
      })
      .catch(_ => {
        this.setError(
          'Inloggningen misslyckades',
          'Det har uppstått ett problem med inloggningen, var god försök igen'
        )
        this.setState({ isLoading: false })
      })
  }

  private alertToInstallBankID() {
    Alert.alert(
      'Kräver inloggning med Mobilt BankID',
      'För att kunna logga in krävs BankIDs säkerhetsapp. Vill du ladda ner appen nu?',
      [
        {
          text: 'Nej',
          onPress: () => {
            this.setState({ isLoading: false })
            return
          }
        },
        {
          text: 'Ja',
          onPress: () => {
            const url =
              Platform.OS === 'ios'
                ? 'itms-apps://itunes.com/apps/bankidsakerhetsapp'
                : 'market://details?id=com.bankid.bus'
            Linking.openURL(url)
              .then(() => {
                return
              })
              .catch(_ =>
                this.setError('Något gick fel', 'Var god försök igen')
              )
          }
        }
      ],
      { cancelable: false }
    )
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
