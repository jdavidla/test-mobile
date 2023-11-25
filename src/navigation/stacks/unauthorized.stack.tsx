import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../modules/unauthorized/login/login.component'
import Signup from '../../modules/unauthorized/sign-up/sign-up.component'

const Stack = createNativeStackNavigator()

const UnauthorizedStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
)

export default UnauthorizedStack
