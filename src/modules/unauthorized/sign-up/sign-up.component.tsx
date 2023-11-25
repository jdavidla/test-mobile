import React from 'react'
import { View, Text, Button } from 'react-native'
import { TextInput, ActivityIndicator } from '../../../shared/components'
import { Controller } from 'react-hook-form'
import useSignUp, { SignUpFormType } from './useSignUp.hook'
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
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Email:"
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
        <Text>Confirm Password:</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <TextInput
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
