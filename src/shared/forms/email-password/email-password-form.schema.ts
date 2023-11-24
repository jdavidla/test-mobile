import * as yup from 'yup'
import { email, password } from './email-password.validations'
import EmailPasswordForm from './email-password-form.type'

const schema: yup.ObjectSchema<EmailPasswordForm> = yup.object({
  email,
  password
})

export default schema
