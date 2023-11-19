import React, { createContext, useState, FC, PropsWithChildren } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

type AuthContext = {
  isLoggedIn: boolean
  logOut: () => void
  authenticate: (user: FirebaseAuthTypes.User | null) => void
}

const DEFAULT_CONTEXT: AuthContext = {
  isLoggedIn: false,
  logOut: () => {},
  authenticate: (user: FirebaseAuthTypes.User | null) => {}
}

const AuthContext = createContext<AuthContext>(DEFAULT_CONTEXT)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const authenticate = (user: FirebaseAuthTypes.User | null) => {
    console.log('devug authenticate !!user', !!user)
    setIsLoggedIn(!!user)
  }

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
    <AuthContext.Provider value={{ isLoggedIn, logOut, authenticate }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
