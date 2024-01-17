import React, { useContext, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { AppContext } from '../../contexts/app.context'
import { currentUser } from '../../shared/services/auth.service'

const Home = ({ route, navigation }) => {
  const { logOut, deepLink, setDeepLink } = useContext(AppContext)

  useEffect(() => {
    if (deepLink) {
      navigation.navigate('Profile', { id: 'fromHome' })
      setDeepLink(null)
    }
  }, [deepLink, navigation])

  return (
    <View style={{ flex: 1 }}>
      {!!currentUser() && currentUser()?.email && (
        <Text>Welcome {currentUser()?.email}</Text>
      )}
      <Text>Route</Text>
      <Text>{JSON.stringify(route)}</Text>
      <Button title="Log out" onPress={logOut} />
    </View>
  )
}

export default Home
