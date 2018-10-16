import { StyleSheet, Dimensions } from 'react-native'

const LOGO_WIDTH = Dimensions.get('window').width - 32

export default StyleSheet.create({
  logoContainer: {
    width: LOGO_WIDTH,
    height: 200,
    backgroundColor: 'black',
    opacity: 0.2,
    borderRadius: 100,
    marginBottom: 8
  },
  child: {
    marginVertical: 8
  },
  invalid: {
    borderWidth: 2,
    borderColor: 'red'
  },
  label: {
    fontSize: 18
  },
  title: {
    marginVertical: 8,
    fontSize: 24,
    fontWeight: 'bold'
  }
})
