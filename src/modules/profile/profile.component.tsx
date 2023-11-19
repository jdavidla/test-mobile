import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { View, Text, Button } from 'react-native'

const Profile = ({ route }) => {
  const { logOut } = useContext(AuthContext)

  return (
    <View style={{ flex: 1 }}>
      <Text>Profile</Text>
      <Text>Route</Text>
      <Text>{JSON.stringify(route)}</Text>
      <Button title="Log out" onPress={logOut} />
    </View>
  )
}

export default Profile
