import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import useSignUp from './useSignUp.hook'
import EmailPasswordFormType from '../../../shared/forms/email-password/email-password-form.type'
import EmailPasswordForm from '../../../shared/forms/email-password/email-password-form.component'
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

  const onSubmitRegister = async ({
    email,
    password
  }: EmailPasswordFormType) => {
    console.log('devug data', { email, password })
    await createUserEmailAndPassword(email, password)
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Signup</Text>
      <EmailPasswordForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmitRegister}
        submitButtonTitle="Register"
        submitError={createUserError}
      />
    </View>
  )
}

export default Signup
