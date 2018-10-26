import React from 'react'
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation'
import AuthLoading from '../screens/AuthLoading'
import Dashboard from '../screens/Dashboard'
import Login from '../screens/Login'
import Payments from '../screens/Payments'
import Drawer from './Drawer'
import Review from '../screens/Review'
import PdfScreen from '../screens/PdfScreen'
import InfoScreen from '../screens/InfoScreen'
import { Platform, StyleSheet } from 'react-native'
import NavigationIcon from './NavigationIcon'
import NotificationIcon from './NotificationIcon'

const styles = StyleSheet.create({
  appHeader: {
    color: 'white',
    backgroundColor: '#116A3E',
    borderBottomColor: '#0c4f2d',
    borderBottomWidth: 2,
    elevation: 6,
    height: Platform.OS === 'ios' ? 68 : 58
  },
  appHeaderTitle: {
    fontWeight: 'bold'
  },
  dashboardHeader: {
    backgroundColor: '#DCE7F1',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0
  },
  dashboardBackTitle: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const PaymentsStack = createStackNavigator(
  {
    Payments,
    PdfScreen
  },
  {
    headerMode: 'none'
  }
)

const DashboardStack = createStackNavigator(
  { Dashboard, PaymentsStack, Review, InfoScreen },
  {
    headerMode: 'float',
    navigationOptions: {
      headerForceInset: { top: 'never', bottom: 'never' },
      title: '',
      headerBackTitle: 'Tillbaka',
      headerStyle: styles.dashboardHeader,
      headerBackTitleStyle: styles.dashboardBackTitle
    }
  }
)

const DrawerStack = createDrawerNavigator(
  { DashboardStack },
  { contentComponent: props => <Drawer {...props} /> }
)

const AppStack = createStackNavigator(
  { DrawerStack },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationIcon navigation={navigation} />,
      headerRight: <NotificationIcon navigation={navigation} />,
      headerTintColor: '#EEEEEE',
      headerStyle: styles.appHeader,
      headerTitleStyle: styles.appHeaderTitle
    })
  }
)

export default createSwitchNavigator({
  AuthLoading,
  Auth: Login,
  App: AppStack
})
