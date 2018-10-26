import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import PaymentCircle from '../../components/PaymentCircle'
import NavigationButton from '../../components/NavigationButton'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import Text from '../../components/Text';

interface IPaymentsScreenProps {
  nextPayment: [number, string]
  hasGivenFeedback: boolean
  leaveFeedback(rating: number): void
  navigateToPayments(): void
  navigateToReview(): void
}

export default (props: IPaymentsScreenProps) => (
  <ScrollView bounces={false} style={styles.container}>
    <PaymentCircle
      nextPayment={props.nextPayment}
      onPress={() => props.navigateToPayments()}
    />
    <View style={{ marginVertical: 16, marginHorizontal: 8 }}>
      <NavigationButton
        title="Utbetalningar"
        icon="account-balance"
        onPress={() => props.navigateToPayments()}
      />
      <NavigationButton
        title="Ärenden"
        icon="folder-shared"
        onPress={() => props.navigateToPayments()}
      />
      <NavigationButton
        title="Föräldrapenning"
        icon="child-friendly"
        onPress={() => props.navigateToPayments()}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          marginTop: 16,
          marginBottom: 8
        }}
      >
        Hur är vår nya applikation?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 16,
          display: props.hasGivenFeedback ? 'none' : 'flex'
        }}
      >
        <Button
          icon="sentiment-satisfied"
          onPress={() => props.leaveFeedback(5)}
          style={{
            maxWidth: 90,
            backgroundColor: '#2ECC71',
            marginHorizontal: 8
          }}
        />
        <Button
          icon="sentiment-dissatisfied"
          onPress={() => props.leaveFeedback(1)}
          style={{
            maxWidth: 90,
            backgroundColor: '#CC2F2F',
            marginHorizontal: 8
          }}
        />
      </View>
      <Button
        icon="thumbs-up-down"
        title="Lämna synpunkter"
        style={{ backgroundColor: '#EEEEEE' }}
        fontStyle={{ color: '#000000' }}
        iconStyle={{ color: '#000000' }}
        onPress={() => props.navigateToReview()}
      />
    </View>
    <Loading isLoading={false} />
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1'
  }
})
