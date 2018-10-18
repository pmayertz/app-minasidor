import React from 'react'
import { View, ViewProperties } from 'react-native'

interface ICardProps extends ViewProperties {
  children: JSX.Element[] | JSX.Element
}

export default (props: ICardProps) => (
  <View
    {...props}
    style={[{
      backgroundColor: '#EEEEEE',
      elevation: 4,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#000000',
      shadowOpacity: 0.2
    }, props.style]}
  >
    {props.children}
  </View>
)
