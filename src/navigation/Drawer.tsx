import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Rest from '../Rest'
import { NavigationScreenProp } from 'react-navigation'
import MenuItem from './MenuItem';
import LogoutButton from './LogoutButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IDrawerProps {
  navigation: NavigationScreenProp<{}, {}>
}

export default (props: IDrawerProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Icon name="child-care" style={styles.placeholder} size={140} />
      <Text style={styles.name}>{props.navigation.getParam('fullname', '')}</Text>
    </View>
    <MenuItem
      icon="home"
      title="Översikt"
      style={{ elevation: 1}}
      onPress={() => {
        props.navigation.navigate('Dashboard')
        props.navigation.toggleDrawer()
      }}
    />
    <LogoutButton
      onPress={() => {
        Rest.logout()
          .then(_ => {
            props.navigation.navigate('Auth')
            props.navigation.toggleDrawer()
          })
          .catch(error => console.log(error))
      }}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1'
  },
  header: {
    paddingBottom: 8,
    backgroundColor: '#116A3E',
    alignItems: 'center',
    elevation: 2
  },
  placeholder: {
    color: '#DCE7F1',
    elevation: 4
  },
  name: {
    color: '#DCE7F1',
    fontSize: 20,
    fontWeight: 'bold',
    elevation: 4
  }
})
