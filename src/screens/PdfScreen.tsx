import React from 'react'
import { StyleSheet, ScrollView, View, Platform } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import PdfView from '../components/PdfView'
import ErrorDialog, { IError } from '../components/ErrorDialog'

interface IReviewProps {
  navigation: NavigationScreenProp<{}, { source: object }>
}

interface IReviewState {
  source: object
  error?: IError
}

export default class Review extends React.Component<
  IReviewProps,
  IReviewState
> {
  constructor(props: IReviewProps) {
    super(props)
    this.state = {
      source: props.navigation.getParam('source', {})
    }
  }

  public render() {
    return (
      <View style={{ flex: 1 }}>
        <PdfView
          source={this.state.source}
          onError={() =>
            this.setState({
              error: {
                title: 'Fel vid hämtning av PDF',
                subtitle:
                  'Ett fel har uppstått vid hämtning av PDF, var god försök igen',
                onClose: () =>
                  this.setState({
                    error: undefined
                  })
              }
            })
          }
        />
        <ErrorDialog error={this.state.error}/>
      </View>
    )
  }
}
