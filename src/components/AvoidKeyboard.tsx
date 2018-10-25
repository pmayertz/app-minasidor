import React from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native';

export default (props: { children: JSX.Element[] | JSX.Element}) => (
  <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{ flex: 0 }}
      >
        <KeyboardAvoidingView behavior="position">
          {props.children}
        </KeyboardAvoidingView>
      </ScrollView>
)