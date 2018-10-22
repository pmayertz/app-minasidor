import React from 'react'
import Container from '../../components/Container'
import { View, Text, Image } from 'react-native'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import styles from './styles'
import strings from '../../resources/strings'
import Loading from '../../components/Loading'
import ErrorDialog, { IError } from '../../components/ErrorDialog'
import AvoidKeyboard from '../../components/AvoidKeyboard'

interface ILoginContainerProps {
  onTextChange(personalNumber: string): void
  login(): void
  invalidField: boolean
  personalNumber: string
  isLoading: boolean
  error?: IError
}

export default (props: ILoginContainerProps) => (
  <View style={{ flex: 1 }}>
    <Container>
      <AvoidKeyboard>
        <View style={styles.logoContainer} />
        <Image
          style={{ width: 300, height: 300, alignSelf: 'center' }}
          source={require('./fk-logo.jpg')}
        />
        <Text style={styles.title}>{strings.LOGIN_BANKID}</Text>
        <Text style={styles.label}>{strings.FILL_PERSONAL_NUMBER}</Text>
        <TextInput
          placeholder={strings.PERSONAL_NUMBER_FORMAT}
          maxLength={13}
          keyboardType="number-pad"
          onChangeText={(personalNumber: string) =>
            props.onTextChange(personalNumber)
          }
          onSubmitEditing={() => props.login()}
          value={props.personalNumber}
          returnKeyType="done"
          style={[styles.child, props.invalidField && styles.invalid]}
        />
        <Button
          title={strings.LOGIN}
          onPress={() => props.login()}
          style={[styles.child, styles.loginButton]}
        />
      </AvoidKeyboard>
    </Container>
    <Loading isLoading={props.isLoading} />
    <ErrorDialog error={props.error} />
  </View>
)
