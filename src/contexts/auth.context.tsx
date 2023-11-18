import React, {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect
} from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

type AuthContext = {
  isLoggedIn: boolean
  logOut: () => void
}

const DEFAULT_CONTEXT: AuthContext = {
  isLoggedIn: false,
  logOut: () => {}
}

const AuthContext = createContext<AuthContext>(DEFAULT_CONTEXT)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('devug user', user)
    setUser(user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    return subscriber
  }, [])

  useEffect(() => {
    setIsLoggedIn(!!user)
  }, [user, setIsLoggedIn])

  const logOut = async () => {
    try {
      await auth().signOut()
      setIsLoggedIn(false)
      console.log('User signed out!')
    } catch (error) {
      console.log('devug error', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
