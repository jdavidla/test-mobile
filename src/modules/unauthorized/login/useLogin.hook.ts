import { useState } from 'react'
import {
  signInWithEmailAndPassword,
  signInAnonymously
} from '../../../shared/services/auth.service'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { email, password } from '../../../shared/forms/inputs.validations'
import * as yup from 'yup'

export type LoginFormType = {
  email: string
  password: string
}

const schema: yup.ObjectSchema<LoginFormType> = yup.object({
  email,
  password
})

const useLogin = () => {
  const [loginUserError, setLoginUserError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema)
  })

  const loginUserEmailAndPassword = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(email, password)
    } catch (error: any) {
      if (error.code === 'auth/invalid-login') {
        console.log(error)
        setLoginUserError('Error - Wrong credentials')
      } else if (error.code === 'auth/invalid-email') {
        console.log(error)
        setLoginUserError('That email address is invalid!')
      } else {
        console.error(error)
        setLoginUserError('There was an error. Please try again later')
      }
      setIsLoading(false)
    }
  }

  const onLoginAnonymous = async () => {
    try {
      setIsLoading(true)
      await signInAnonymously()
      console.log('devug User signed in anonymously')
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('devug Enable anonymous in your firebase console.')
      }
      console.error('devug error', error)
      setIsLoading(false)
    }
  }

  return {
    errors,
    control,
    handleSubmit,
    loginUserError,
    loginUserEmailAndPassword,
    isLoading,
    onLoginAnonymous
  }
}

export default useLogin
