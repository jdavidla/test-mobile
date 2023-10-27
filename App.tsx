/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, Text, useColorScheme, View } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { RN_APP_CONFIG } from './src/shared/common/config'

function App(): JSX.Element {
  console.log('Reading from env: ', RN_APP_CONFIG)
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{ flex: 1 }}>
        <Text>Home</Text>
        <Text>Env</Text>
        <Text>{RN_APP_CONFIG}</Text>
      </View>
    </SafeAreaView>
  )
}

export default App
