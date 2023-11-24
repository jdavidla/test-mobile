import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import useSignUp, { SignUpFormType } from './useSignUp.hook'
import ActivityIndicator from '../../../shared/components/activity-indicator/activity-indicator.component'
import styles from './signup.style'

const Signup = () => {
  const {
    createUserError,
    createUserEmailAndPassword,
    errors,
    control,
    handleSubmit,
    isLoading
  } = useSignUp()

  const onSubmitRegister = async ({ email, password }: SignUpFormType) => {
    console.log('devug data', { email, password })
    await createUserEmailAndPassword(email, password)
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Signup</Text>
      <View>
        <Text>Email:</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="email"
              inputMode="email"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        <Text>Password:</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={styles.textInput}
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
        <Text>Confirm Password:</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
              inputMode="text"
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}
        <Button title="Sign up" onPress={handleSubmit(onSubmitRegister)} />
        {createUserError && (
          <Text style={styles.errorText}>{createUserError}</Text>
        )}
      </View>
    </View>
  )
}

export default Signup
