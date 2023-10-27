import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../modules/home/home.component'

type Props = {
  isLoggedIn?: boolean
}

const Stack = createNativeStackNavigator()

const UnauthorizedStack: FC<Props> = ({ isLoggedIn = false }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
)

export default UnauthorizedStack
