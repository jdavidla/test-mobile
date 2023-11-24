import { useState } from 'react'
import * as yup from 'yup'
import { email, password } from '../../../shared/validations/inputs'
import { createUserWithEmailAndPassword } from '../../../shared/services/auth.service'

export type FormData = {
  email: string
  password: string
}

export const schema: yup.ObjectSchema<FormData> = yup.object({
  email,
  password
})

const useSignUp = () => {
  const [createUserError, setCreateUserError] = useState<string>()

  const createUserEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      await createUserWithEmailAndPassword(email, password)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
        setCreateUserError('That email address is already in use!')
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!')
        setCreateUserError('That email address is invalid!')
      }

      console.error(error)
    }
  }

  return {
    createUserError,
    createUserEmailAndPassword
  }
}

export default useSignUp
