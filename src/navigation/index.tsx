import React from 'react'
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation'
import AuthLoading from '../screens/AuthLoading'
import Dashboard from '../screens/Dashboard'
import Login from '../screens/Login'
import Drawer from './Drawer'
import PaymentDetails from '../screens/PaymentDetails'
import Review from '../screens/Review'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Platform } from 'react-native';

const DashboardStack = createStackNavigator(
  { Dashboard, PaymentDetails, Review },
  {
    headerMode: 'float',
    navigationOptions: {
      title: '',
      headerBackTitle: 'Tillbaka',
      headerStyle: {
        backgroundColor: '#DCE7F1',
        elevation: 0,
        shadowOpacity: 0,
        height: 20,
        borderBottomWidth: 0,
      }
    }
  }
)
const DrawerStack = createDrawerNavigator(
  { DashboardStack },
  { contentComponent: Drawer }
)

const AppStack = createStackNavigator(
  { DrawerStack },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Icon
          name="navicon"
          size={32}
          style={{ padding: 16, color: '#EEEEEE' }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerRight: (
        <Icon
          name="bell"
          size={32}
          style={{ padding: 16, color: '#EEEEEE' }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerStyle: {
        color: 'white',
        backgroundColor: '#116A3E',
        borderBottomColor: '#0c4f2d',
        borderBottomWidth: 2,
        elevation: 6,
        height: Platform.OS === 'ios' ? 68 : 58 ,
      },
      headerTintColor: '#EEEEEE',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    })
  }
)

export default createSwitchNavigator({
  AuthLoading,
  Auth: Login,
  App: AppStack
})
