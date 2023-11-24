import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import {
  Controller,
  Control,
  FieldErrors,
  UseFormHandleSubmit
} from 'react-hook-form'
import EmailPasswordFormType from './email-password-form.type'
import styles from './email-password-form.styles'

type EmailPasswordFormProps = {
  control: Control<EmailPasswordFormType, any>
  errors: FieldErrors<EmailPasswordFormType>
  handleSubmit: UseFormHandleSubmit<EmailPasswordFormType, undefined>
  submitError?: string
  onSubmit: ({ email, password }: EmailPasswordFormType) => Promise<void>
  submitButtonTitle: string
}

const EmailPasswordForm = ({
  control,
  errors,
  handleSubmit,
  submitError,
  onSubmit,
  submitButtonTitle
}: EmailPasswordFormProps) => {
  return (
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
      <Button title={submitButtonTitle} onPress={handleSubmit(onSubmit)} />
      {submitError && <Text style={styles.errorText}>{submitError}</Text>}
    </View>
  )
}

export default EmailPasswordForm
