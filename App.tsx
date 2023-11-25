/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Splash screen config was build based on: https://medium.com/@FreeTutorialsIndia/splash-screen-in-react-native-android-ios-2020-842f26d1da98

import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  useColorScheme,
  Text,
  Linking,
  ColorSchemeName
} from 'react-native'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme
} from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { RN_APP_CONFIG } from './src/shared/config/envs.config'
import SplashScreen from 'react-native-splash-screen'
import RootNavigator from './src/navigation/stacks/root-navigator.stack'
import { RootStackParamList } from './src/navigation/linking'
import { AppProvider } from './src/contexts/app.context'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useNavigationContainerRef } from '@react-navigation/native'
import handleDeepLink from './src/navigation/handle-deep-link'

import './src/shared/config/styles.config'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'
  const [theme, setTheme] = useState<ColorSchemeName>(
    isDarkMode ? 'dark' : 'light'
  )
  const navigationRef = useNavigationContainerRef<RootStackParamList>()
  const [deeplink, setDeepLink] = useState<string | null>(null)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('devug onAuthStateChanged user', !!user)
    setUser(user)
    if (!user) setDeepLink(null)
  }

  // getInitialURL gets invoked when app launch
  const handleInitialURL = async () => {
    const url = await Linking.getInitialURL()
    console.log('devug getInitialURL url', url, 'user', !!auth().currentUser)
    if (url && !!auth().currentUser) {
      handleDeepLink(url, true)
      navigationRef.navigate('AuthorizedStack', { screen: 'Profile' }) // Navigates from home
      // navigationRef.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: 'AuthorizedStack',
      //       params: { screen: 'Profile', params: { id: 'getInitialURL' } }
      //     }
      //   ]
      // })
    } else if (url) {
      setDeepLink(url)
    }
  }

  // Gets invoked when app is already opened and a deep link comes
  const urlListener = (event: { url: string }) => {
    console.log('devug urlListener event', event)
    if (!!auth().currentUser) {
      handleDeepLink(event.url, true)
      navigationRef.navigate('AuthorizedStack', { screen: 'Profile' }) // Navigates from home
      // navigationRef.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: 'AuthorizedStack',
      //       params: { screen: 'Profile', params: { id: 'urlListener' } }
      //     }
      //   ]
      // })
    } else {
      setDeepLink(event.url)
    }
  }

  useEffect(() => {
    console.log('Reading from env:', RN_APP_CONFIG)
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    const urlSuscriber = Linking.addEventListener('url', urlListener)
    handleInitialURL()
    SplashScreen.hide()

    return () => {
      subscriber()
      urlSuscriber.remove()
    }
  }, [])

  return (
    <AppProvider setTheme={setTheme} theme={theme}>
      <NavigationContainer
        theme={theme === 'dark' ? DarkTheme : DefaultTheme}
        ref={navigationRef}
        //  linking={linking}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {RN_APP_CONFIG !== 'prod' && (
            <Text style={{ backgroundColor: 'white', color: 'black' }}>
              Hello from: {RN_APP_CONFIG}
            </Text>
          )}
          <RootNavigator user={user} deepLink={deeplink} />
        </SafeAreaView>
      </NavigationContainer>
    </AppProvider>
  )
}

export default App
