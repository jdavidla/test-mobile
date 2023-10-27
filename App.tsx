/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Splash screen config was build based on: https://medium.com/@FreeTutorialsIndia/splash-screen-in-react-native-android-ios-2020-842f26d1da98

import React, { useEffect } from 'react'
import { SafeAreaView, useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { RN_APP_CONFIG } from './src/shared/common/config'
import SplashScreen from 'react-native-splash-screen'
import NavigationSwitch from './src/navigation/navigation-switch.component'

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
        <NavigationSwitch isLoggedIn={false} />
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
