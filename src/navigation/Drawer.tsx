import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Rest from '../Rest'
import { NavigationScreenProp } from 'react-navigation'
import MenuItem from './MenuItem';
import LogoutButton from './LogoutButton';

interface IDrawerProps {
  navigation: NavigationScreenProp<{}, {}>
}

export default ({ navigation }: IDrawerProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.placeholder} />
      <Text style={styles.name}>Namn Namnsson</Text>
    </View>
    <MenuItem
      icon="archive"
      title="Översikt"
      style={{ elevation: 1}}
      onPress={() => {
        navigation.navigate('Dashboard')
        navigation.toggleDrawer()
      }}
    />
    <LogoutButton
      onPress={() => {
        Rest.logout()
          .then(_ => {
            navigation.navigate('Auth')
            navigation.toggleDrawer()
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
    padding: 8,
    backgroundColor: '#116A3E',
    alignItems: 'center',
    elevation: 2
  },
  placeholder: {
    width: 140,
    height: 140,
    backgroundColor: '#DCE7F1',
    borderRadius: 70,
    elevation: 4
  },
  name: {
    paddingTop: 8,
    color: '#DCE7F1',
    fontSize: 20,
    fontWeight: 'bold',
    elevation: 4
  }
})
