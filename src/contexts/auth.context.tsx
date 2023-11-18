import React, { createContext, useState, FC, PropsWithChildren } from 'react'

type AuthContext = {
  isLoggedIn: boolean
  authenticate: () => void
  logOut: () => void
}

const DEFAULT_CONTEXT: AuthContext = {
  isLoggedIn: false,
  authenticate: () => {},
  logOut: () => {}
}

const AuthContext = createContext<AuthContext>(DEFAULT_CONTEXT)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const authenticate = () => {
    setIsLoggedIn(true)
  }

  const logOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, authenticate, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
