import React, { createContext, useState, FC, PropsWithChildren } from 'react'
import auth from '@react-native-firebase/auth'
import { ColorSchemeName } from 'react-native/types'

type AppContextProps = {
  children: React.ReactNode
  theme: ColorSchemeName
  setTheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>
}

type AppContext = {
  logOut: () => void
  deeplink: string | null
  theme: ColorSchemeName
  setDeepLink: React.Dispatch<React.SetStateAction<string | null>>
  setTheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>
}

const DEFAULT_CONTEXT: AppContext = {
  logOut: () => {},
  deeplink: null,
  theme: 'light',
  setDeepLink: () => {},
  setTheme: () => {}
}

const AppContext = createContext<AppContext>(DEFAULT_CONTEXT)

const AppProvider: FC<AppContextProps> = ({ children, setTheme, theme }) => {
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
    <AppContext.Provider
      value={{ logOut, deeplink, setDeepLink, setTheme, theme }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
