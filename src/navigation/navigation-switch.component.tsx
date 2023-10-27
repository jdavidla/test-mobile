import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UnauthorizedStack from '../navigation/stacks/unauthorized.stack'
import HomeStack from '../navigation/stacks/home.stack'

type Props = {
  isLoggedIn?: boolean
}

const Stack = createNativeStackNavigator()

const NavigationSwitch: FC<Props> = ({ isLoggedIn = false }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!isLoggedIn ? (
      <>
        <Stack.Screen name="UnauthorizedStack" component={UnauthorizedStack} />
      </>
    ) : (
      <>
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </>
    )}
  </Stack.Navigator>
)

export default NavigationSwitch
