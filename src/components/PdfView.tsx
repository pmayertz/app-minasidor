import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'

import Pdf from 'react-native-pdf';

interface IPdfProps {
  source?: object
}

export default ({ source }: IPdfProps) =>
  source ? (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`source: ${JSON.stringify(source)}`)
          console.log(`number of pages: ${numberOfPages}`)
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`)
        }}
        onError={error => {
          console.log(error)
        }}
        style={styles.pdf}
      />
    </View>
  ) : null

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    }
});
