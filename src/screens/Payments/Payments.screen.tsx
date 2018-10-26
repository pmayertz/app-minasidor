import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Card from '../../components/Card'
import Text from '../../components/Text';

interface IPaymentsScreenProps {
  prelAndDone: JSX.Element[]
  history: JSX.Element[]
}

const EmptyList = (props: { message: string }) => (
  <Card style={{ padding: 16, marginBottom: 16 }}>
    <Text style={{ fontSize: 18 }}>{props.message}</Text>
  </Card>
)

export default (props: IPaymentsScreenProps) => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Kommande</Text>
    {props.prelAndDone.length === 0 && (
      <EmptyList message="Du har inte några kommande utbetalningar för tillfället" />
    )}
    {props.prelAndDone}
    <Text style={styles.title}>Historiska</Text>
    {props.history.length === 0 && (
      <EmptyList message="Du har inte några historiska utbetalningar för tillfället" />
    )}
    {props.history}
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1',
    paddingHorizontal: 8
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600'
  }
})
