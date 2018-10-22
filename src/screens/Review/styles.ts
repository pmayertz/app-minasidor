import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE7F1',
    paddingTop: 10
  },
  review: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  titleContainer: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  scoreContainer: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  commentContainer: {
    paddingVertical: 10
  },

  boldText: {
    fontWeight: 'bold'
  },

  comment: {
    marginTop: 10
  }
})
