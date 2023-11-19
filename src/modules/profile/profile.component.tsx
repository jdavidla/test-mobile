import React from 'react'
import { View, Text } from 'react-native'

const Profile = ({ route }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Profile</Text>
      <Text>Route</Text>
      <Text>{JSON.stringify(route)}</Text>
    </View>
  )
}

export default Profile
