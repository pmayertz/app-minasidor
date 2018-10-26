import React, { Component } from 'react'
import { View } from 'react-native'
import Text from '../components/Text'
import Button from '../components/Button'
import { NavigationScreenProp } from 'react-navigation'
import Container from '../components/Container'

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

export default class InfoScreen extends Component<IProps> {
  public render = () => (
    <Container style={{ backgroundColor: '#DCE7F1' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', paddingVertical: 16 }}>
        Funktionalitet saknas
      </Text>
      <Text style={{ fontSize: 18, paddingBottom: 16 }}>
        Denna funktionalitet har ännu inte implementerats. Hade du velat använda
        funktionen, var vänlig lämna synpunkt genom att klicka på knappen nedan.
      </Text>
      <Button
        icon="thumbs-up-down"
        title="Lämna synpunkter"
        style={{ backgroundColor: '#EEEEEE' }}
        fontStyle={{ color: '#000000' }}
        iconStyle={{ color: '#000000' }}
        onPress={() => this.props.navigation.navigate('Review')}
      />
    </Container>
  )
}
