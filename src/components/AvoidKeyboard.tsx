import React from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native';

export default (props: { children: JSX.Element[] | JSX.Element}) => (
  <ScrollView
        bounces={false}
        style={{
          flex: 1,
          backgroundColor: '#007D46'
        }}
        contentContainerStyle={{ flex: 0 }}
      >
        <KeyboardAvoidingView behavior="position">
          {props.children}
        </KeyboardAvoidingView>
      </ScrollView>
)