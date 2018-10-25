import React from 'react'
import { View, Text, Picker } from 'react-native'
import TextInput from '../../components/TextInput'
import ErrorDialog, { IError } from '../../components/ErrorDialog'
import styles from './styles'
import Button from '../../components/Button'
import AvoidKeyboard from '../../components/AvoidKeyboard';

interface IReviewScreenProps {
  score: number
  message: string
  error?: IError

  onChangeScore(score: number): void
  onChangeMessage(message: string): void
  sendFeedback(): void
}

export default (props: IReviewScreenProps) => (
  <AvoidKeyboard>
    <View style={styles.review}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lämna synpunkter</Text>
        <Text>
          Vi vill gärna ha dina åsikter, du kan lämna dem och betyg nedan.
        </Text>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.boldText}>
          Hur troligt är det att du rekomenderar denna applikation till andra?
        </Text>
        <Text>1 = Inte troligt, 5 = Väldigt troligt</Text>
        <Picker
          selectedValue={props.score}
          onValueChange={(itemValue, _) => props.onChangeScore(itemValue)}
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
          Lämna synpunkter på befintliga funktioner eller funktioner som du vill
          se i kommande versioner.
        </Text>
        <TextInput
          style={styles.comment}
          value={props.message}
          onChangeText={message => props.onChangeMessage(message)}
        />
      </View>
      <Button title="Skicka" onPress={() => props.sendFeedback()} />
      <ErrorDialog error={props.error} />
    </View>
  </AvoidKeyboard>
)
