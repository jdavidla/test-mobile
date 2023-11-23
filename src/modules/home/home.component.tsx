import React, { useContext, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { AppContext } from '../../contexts/auth.context'

const Home = ({ route, navigation }) => {
  const { logOut, deeplink } = useContext(AppContext)

  useEffect(() => {
    if (deeplink) {
      navigation.navigate('Profile', { id: 'fromHome' })
    }
  }, [deeplink, navigation])

  return (
    <View style={{ flex: 1 }}>
      <Text>Home</Text>
      <Text>Route</Text>
      <Text>{JSON.stringify(route)}</Text>
      <Button title="Log out" onPress={logOut} />
    </View>
  )
}

export default Home
