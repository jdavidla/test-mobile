import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useSignUp, { FormData, schema } from './useSignUp.hook'
import styles from './signup.style'

const Signup = ({ route, navigation }) => {
  const { createUserError, createUserEmailAndPassword } = useSignUp()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmitRegister = async ({ email, password }: FormData) => {
    console.log('devug data', { email, password })
    await createUserEmailAndPassword(email, password)
  }

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
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>
      <Button title="Register" onPress={handleSubmit(onSubmitRegister)} />
      {createUserError && (
        <Text style={styles.errorText}>{createUserError}</Text>
      )}
    </View>
  )
}

export default Signup
