import React from 'react'
import { View, Text, Button } from 'react-native'
import { TextInput, ActivityIndicator } from '../../../shared/components'
import styles from './login.style'
import { Controller } from 'react-hook-form'
import useLogin, { LoginFormType } from './useLogin.hook'

const Login = ({ route, navigation }) => {
  const {
    loginUserError,
    loginUserEmailAndPassword,
    errors,
    control,
    handleSubmit,
    isLoading,
    onLoginAnonymous
  } = useLogin()

  const goToSignUp = () => {
    navigation.navigate('Signup')
  }

  const onSubmitLogin = async ({ email, password }: LoginFormType) => {
    console.log('devug data', { email, password })
    await loginUserEmailAndPassword(email, password)
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Login</Text>
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <TextInput
              placeholder="email"
              inputMode="email"
              onChangeText={onChange}
              value={value}
              label="Email:"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Password:"
              placeholder="password"
              inputMode="text"
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
        <Button title="Log in" onPress={handleSubmit(onSubmitLogin)} />
        {loginUserError && (
          <Text style={styles.errorText}>{loginUserError}</Text>
        )}
      </View>
      <Button title="Login Anonymous" onPress={onLoginAnonymous} />
      <Button title="Register" onPress={goToSignUp} />
    </View>
  )
}

export default Login
