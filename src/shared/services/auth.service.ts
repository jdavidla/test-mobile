import auth from '@react-native-firebase/auth'

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return auth().createUserWithEmailAndPassword(email, password)
}

const signInWithEmailAndPassword = async (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password)
}

const currentUser = () => {
  return auth().currentUser
}

const signInAnonymously = async () => {
  return auth().signInAnonymously()
}

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser,
  signInAnonymously
}
