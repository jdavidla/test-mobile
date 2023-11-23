/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Splash screen config was build based on: https://medium.com/@FreeTutorialsIndia/splash-screen-in-react-native-android-ios-2020-842f26d1da98

import React, { useEffect, useState } from 'react'
import { SafeAreaView, useColorScheme, Text, Linking } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { RN_APP_CONFIG } from './src/shared/config/envs.config'
import SplashScreen from 'react-native-splash-screen'
import RootNavigator from './src/navigation/stacks/root-navigator.stack'
import linking, { RootStackParamList } from './src/navigation/linking'
import { AppProvider } from './src/contexts/auth.context'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useNavigationContainerRef } from '@react-navigation/native'
import handleDeepLink from './src/navigation/handle-deep-link'

import './src/shared/config/styles.config'

function App(): JSX.Element {
  const navigationRef = useNavigationContainerRef<RootStackParamList>()
  const [deeplink, setDeepLink] = useState<string | null>(null)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    // console.log('devug onAuthStateChanged user', user)
    setUser(user)
    if (!user) setDeepLink(null)
  }

  // getInitialURL gets invoked when app launch
  const handleInitialURL = async () => {
    const url = await Linking.getInitialURL()
    console.log('devug getInitialURL url', url, 'user', auth().currentUser)
    if (url && !!auth().currentUser) {
      handleDeepLink(url, true)
      navigationRef.navigate('AuthorizedStack', { screen: 'Profile' }) // Navigates from home
      // navigationRef.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: 'AuthorizedStack',
      //       params: { screen: 'Profile', params: { id: 'caca' } }
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
      //       params: { screen: 'Profile', params: { id: 'caca' } }
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

  const isDarkMode = useColorScheme() === 'dark'
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      //  linking={linking}
    >
      <SafeAreaView style={backgroundStyle}>
        {RN_APP_CONFIG !== 'prod' && <Text>Hello from: {RN_APP_CONFIG}</Text>}
        <AppProvider>
          <RootNavigator user={user} deepLink={deeplink} />
        </AppProvider>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
