import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NavigationScreenProp } from 'react-navigation';

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

export default ({ navigation }: IProps) => (
  <Icon
    name="bell"
    size={32}
    style={{ padding: 16, color: '#EEEEEE' }}
    onPress={() => navigation.navigate('InfoScreen')}
  />
)
