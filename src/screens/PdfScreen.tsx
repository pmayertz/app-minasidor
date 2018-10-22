import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import PdfView from '../components/PdfView';

interface IReviewProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IReviewState {
  source: object
}

export default class Review extends React.Component<
  IReviewProps,
  IReviewState
> {
  constructor(props: IReviewProps) {
    super(props)
    this.state = {
      source: props.navigation.getParam('source', null)
    }
  }

  public render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <PdfView source={this.state.source} />
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
