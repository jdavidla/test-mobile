import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import styles from './login.style'
import auth from '@react-native-firebase/auth'
import EmailPasswordFormType from '../../../shared/forms/email-password/email-password-form.type'
import EmailPasswordForm from '../../../shared/forms/email-password/email-password-form.component'
import ActivityIndicator from '../../../shared/components/activity-indicator/activity-indicator.component'
import useLogin from './useLogin.hook'

const Login = ({ route, navigation }) => {
  const {
    loginUserError,
    loginUserEmailAndPassword,
    errors,
    control,
    handleSubmit,
    isLoading
  } = useLogin()

  const onLoginAnonymous = async () => {
    try {
      await auth().signInAnonymously()
      console.log('devug User signed in anonymously')
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('devug Enable anonymous in your firebase console.')
      }

      console.error('devug error', error)
    }
  }

  const goToSignUp = () => {
    navigation.navigate('Signup')
  }

  const onSubmitLogin = async ({ email, password }: EmailPasswordFormType) => {
    console.log('devug data', { email, password })
    await loginUserEmailAndPassword(email, password)
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Login</Text>
      <EmailPasswordForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmitLogin}
        submitButtonTitle="Login"
        submitError={loginUserError}
      />
      <Button title="Login Anonymous" onPress={onLoginAnonymous} />
      <Button title="Register" onPress={goToSignUp} />
    </View>
  )
}

export default Login
