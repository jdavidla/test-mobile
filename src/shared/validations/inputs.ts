import * as yup from 'yup'

const email = yup
  .string()
  .required('Email is required')
  .email()
  .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email')
  .default('')

const password = yup
  .string()
  .required('Pasword is required')
  .min(8, 'Password must be at least 8 characters long')
  .max(16, 'Password can be max 16 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)+(?=.*[:#_@$!%*?&])+[A-Za-z\d:#_@$!%*?&]+$/,
    'Password must have lowercase and uppercase letters, numbers, and special characters'
  )
  .default('')

export { email, password }
