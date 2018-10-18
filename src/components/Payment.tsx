import React from 'react'
import { View, Text } from "react-native";


export default (item: IPayment) => (
  <View style={{ backgroundColor: 'white' }}>
    <Text>{item.specifikation}</Text>
    <Text>{item.datum}</Text>
    <Text>{item.nettobelopp} kr</Text>
  </View>
)