import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../modules/unauthorized/login/login.component'

const Stack = createNativeStackNavigator()

const UnauthorizedStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
)

export default UnauthorizedStack
