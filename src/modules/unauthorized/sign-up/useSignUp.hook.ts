import { useState } from 'react'
import { createUserWithEmailAndPassword } from '../../../shared/services/auth.service'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { email, password } from '../../../shared/forms/inputs.validations'
import * as yup from 'yup'

export type SignUpFormType = {
  email: string
  password: string
  confirmPassword: string
}

const schema: yup.ObjectSchema<SignUpFormType> = yup.object({
  email,
  password,
  confirmPassword: password.oneOf([yup.ref('password')], 'Passwords must match')
})

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [createUserError, setCreateUserError] = useState<string>()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignUpFormType>({
    resolver: yupResolver(schema)
  })

  const createUserEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true)
      await createUserWithEmailAndPassword(email, password)
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
        setCreateUserError('That email address is already in use!')
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!')
        setCreateUserError('That email address is invalid!')
      } else {
        console.error(error)
        setCreateUserError(
          'There was an error on sign up. Please try again later'
        )
      }
      setIsLoading(false)
    }
  }

  return {
    errors,
    control,
    handleSubmit,
    createUserError,
    createUserEmailAndPassword,
    isLoading
  }
}

export default useSignUp
