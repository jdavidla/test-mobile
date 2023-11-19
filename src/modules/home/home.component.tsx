import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../../contexts/auth.context'

const Home = () => {
  const { logOut } = useContext(AuthContext)

  return (
    <View style={{ flex: 1 }}>
      <Text>Home</Text>
      <Button title="Log out" onPress={logOut} />
    </View>
  )
}

export default Home
