import React from 'react'
import { View, StyleSheet, Text, Picker, ScrollView, Alert } from 'react-native'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import * as Rest from '../Rest'
import { NavigationScreenProp } from 'react-navigation';

interface IReviewProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IReviewState {
  score: number
  message: string
  status: boolean
}

export default class Review extends React.Component<IReviewProps, IReviewState> {
  constructor(props: IReviewProps) {
    super(props)
    this.state = {
      score: 1,
      message: '',
      status: true
    }
  }

  public render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.review}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Lämna synpunkter</Text>
            <Text>
              Vi vill gärna ha dina åsikter, du kan lämna dem och betyg nedan.
            </Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.boldText}>
              Hur troligt är det att du rekomenderar denna applikation till
              andra?
            </Text>
            <Text>1 = Inte troligt, 5 = Väldigt troligt</Text>
            <Picker
              selectedValue={this.state.score}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ score: itemValue })
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
          </View>

          <View style={styles.commentContainer}>
            <Text style={styles.boldText}>Vad tycker du om applikationen?</Text>
            <Text>
              Lämna synpunkter på befintliga funktioner eller funktioner som du
              vill se i kommande versioner.
            </Text>
            <TextInput
              style={styles.comment}
              onChangeText={(message: string) => this.setState({ message })}
            />
          </View>
          <Button title="Skicka" onPress={() => this.sendFeedback()} />
        </View>
      </ScrollView>
    )
  }
  
  private sendFeedback() {
    Rest.skickaEpost(this.state.score, this.state.message)
      .then(() => {
        this.setState({ status: true })
        this.alertSuccess()
        this.props.navigation.navigate('Dashboard')
      })
      .catch(() => {
        this.setState({ status: false })
        // TODO visa felmeddelande
      })
  }

  private alertSuccess() {
    Alert.alert(
      'Synpunkt skickad',
      'Tack! Vi har nu tagit emot dina synpunkter.'
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1',
    paddingTop: 10
  },
  review: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  titleContainer: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  scoreContainer: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  commentContainer: {
    paddingVertical: 10
  },

  boldText: {
    fontWeight: 'bold'
  },

  comment: {
    marginTop: 10
  }
})
