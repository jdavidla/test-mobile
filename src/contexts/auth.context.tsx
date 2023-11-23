import React, { createContext, useState, FC, PropsWithChildren } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

type AppContext = {
  logOut: () => void
  deeplink: string | null
  setDeepLink: React.Dispatch<React.SetStateAction<string | null>>
}

const DEFAULT_CONTEXT: AppContext = {
  logOut: () => {},
  deeplink: null,
  setDeepLink: () => {}
}

const AppContext = createContext<AppContext>(DEFAULT_CONTEXT)

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [deeplink, setDeepLink] = useState<string | null>(
    DEFAULT_CONTEXT.deeplink
  )

  const clearContext = () => {
    setDeepLink(null)
  }

  const logOut = async () => {
    try {
      await auth().signOut()
      clearContext()
      console.log('User signed out!')
    } catch (error) {
      console.log('devug error', error)
    }
  }

  return (
    <AppContext.Provider value={{ logOut, deeplink, setDeepLink }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
