import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Text from './Text';

interface INavigationButtonProps {
  title: string
  icon: string
  onPress(): void
  style?: object
  fontStyle?: object
}

const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 16,
    paddingVertical: 24,
    width: '100%',
    elevation: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    marginBottom: 8
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 16
  }
})

export default ({
  title,
  icon,
  onPress,
  style,
  fontStyle
}: INavigationButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[defaultStyles.button, style]}
    activeOpacity={0.8}
  >
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <Icon name={icon} size={50} />
      <Text style={defaultStyles.text}>{title}</Text>
      <Icon
        name="chevron-right"
        size={40}
        style={{ alignSelf: 'center', marginLeft: 'auto' }}
      />
    </View>
  </TouchableOpacity>
)
