import React from 'react'
import { Alert } from 'react-native'
import * as Rest from '../../Rest'
import { NavigationScreenProp } from 'react-navigation'
import { IError } from '../../components/ErrorDialog'
import ReviewScreen from './Review.screen'

interface IReviewProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IReviewState {
  score: number
  message: string
  error?: IError
}

export default class ReviewContainer extends React.Component<
  IReviewProps,
  IReviewState
> {
  constructor(props: IReviewProps) {
    super(props)
    this.state = {
      score: 1,
      message: '',
      error: undefined
    }
  }

  public render = () => (
    <ReviewScreen
      score={this.state.score}
      message={this.state.message}
      error={this.state.error}
      onChangeScore={score => this.setState({ score })}
      onChangeMessage={message => this.setState({ message })}
      sendFeedback={() => this.sendFeedback()}
    />
  )

  private sendFeedback() {
    Rest.skickaEpost(this.state.score, this.state.message)
      .then(() => {
        this.alertSuccess()
        this.props.navigation.navigate('Dashboard')
      })
      .catch(() => {
        this.setState({
          error: {
            title: 'Kunde inte skicka',
            subtitle:
              'Vi kan tyvärr inte ta emot dina synpunkter just nu. Försöker igen senare',
            onClose: () => this.setState({ error: undefined })
          }
        })
      })
  }

  private alertSuccess() {
    Alert.alert(
      'Synpunkt skickad',
      'Tack! Vi har nu tagit emot dina synpunkter.'
    )
  }
}
