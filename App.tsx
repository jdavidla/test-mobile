/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, Text, useColorScheme, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { RN_APP_CONFIG } from './src/shared/common/config'
import NavigationSwitch from './src/navigation/navigation-switch.component'

function App(): JSX.Element {
  console.log('Reading from env: ', RN_APP_CONFIG)
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <NavigationSwitch isLoggedIn={true} />
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
