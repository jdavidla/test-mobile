/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Splash screen config was build based on: https://medium.com/@FreeTutorialsIndia/splash-screen-in-react-native-android-ios-2020-842f26d1da98

import React, { useEffect } from 'react'
import { SafeAreaView, useColorScheme, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { RN_APP_CONFIG } from './src/shared/config/envs.config'
import SplashScreen from 'react-native-splash-screen'
import RootNavigator from './src/navigation/stacks/root-navigator.stack'
import { AuthProvider } from './src/contexts/auth.context'

import './src/shared/config/styles.config'

function App(): JSX.Element {
  useEffect(() => {
    console.log('Reading from env:', RN_APP_CONFIG)
    SplashScreen.hide()
  }, [])

  const isDarkMode = useColorScheme() === 'dark'
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        {RN_APP_CONFIG !== 'prod' && <Text>Hello from: {RN_APP_CONFIG}</Text>}
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
