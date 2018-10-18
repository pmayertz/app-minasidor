import React from 'react'
import Navigation from './navigation'
import { StatusBar, View } from 'react-native';

export default () => 
    <View style={{flex: 1}}>
        <Navigation />
        <StatusBar
            barStyle="light-content"
            backgroundColor="#116A3E"
        />
    </View>
