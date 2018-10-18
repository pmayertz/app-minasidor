import React from 'react'
import Navigation from './navigation'
import { StatusBar, View } from 'react-native';

export default () => 
    <View style={{flex: 1}}>
        <Navigation />
         <View>
            <StatusBar
                barStyle="light-content"
            />
        </View>
    </View>
