import auth from '@react-native-firebase/auth'

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return auth().createUserWithEmailAndPassword(email, password)
}

const currentUser = () => {
  return auth().currentUser
}

export { createUserWithEmailAndPassword, currentUser }
