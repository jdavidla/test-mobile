import { useState } from 'react'
import { signInWithEmailAndPassword } from '../../../shared/services/auth.service'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import EmailPasswordForm from '../../../shared/forms/email-password/email-password-form.type'
import schema from '../../../shared/forms/email-password/email-password-form.schema'

const useLogin = () => {
  const [loginUserError, setLoginUserError] = useState<string>()
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
    }
  }

  return {
    errors,
    control,
    handleSubmit,
    loginUserError,
    createUserEmailAndPassword
  }
}

export default useLogin
