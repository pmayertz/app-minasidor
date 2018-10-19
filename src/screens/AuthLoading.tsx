import React from 'react'
import { View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import Container from '../components/Container'
import * as Rest from '../Rest'
import Loading from '../components/Loading'

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

export default class AuthLoading extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    this.bootstrapAsync()
  }

  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Container />
        <Loading isLoading={true} />
      </View>
    )
  }

  private bootstrapAsync = () => {
    Rest.login()
      .then(response => {
        this.props.navigation.navigate(
          response.type === 'formrequest' ? 'Auth' : 'App'
        )
      })
      .catch(_ => this.props.navigation.navigate('Auth'))
  }
}
