import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../modules/home/home.component'
import Profile from '../../modules/profile/profile.component'

const Stack = createNativeStackNavigator()

const AuthorizedStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
)

export default AuthorizedStack
