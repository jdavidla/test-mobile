import { useState } from 'react'
import { createUserWithEmailAndPassword } from '../../../shared/services/auth.service'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import EmailPasswordForm from '../../../shared/forms/email-password/email-password-form.type'
import schema from '../../../shared/forms/email-password/email-password-form.schema'

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [createUserError, setCreateUserError] = useState<string>()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<EmailPasswordForm>({
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
