import React, { useContext, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { AppContext } from '../../contexts/auth.context'
import { currentUser } from '../../shared/services/auth.service'

const Home = ({ route, navigation }) => {
  const { logOut, deeplink } = useContext(AppContext)

  useEffect(() => {
    if (deeplink) {
      navigation.navigate('Profile', { id: 'fromHome' })
    }
  }, [deeplink, navigation])

  return (
    <View style={{ flex: 1 }}>
      {!!currentUser() && <Text>Welcome {currentUser()?.email}</Text>}
      <Button title="Log out" onPress={logOut} />
    </View>
  )
}

export default Home
