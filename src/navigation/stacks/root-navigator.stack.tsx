import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UnauthorizedStack from './unauthorized.stack'
import HomeStack from './home.stack'
import { AuthContext } from '../../contexts/auth.context'

const Stack = createNativeStackNavigator()

const NavigationSwitch = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="UnauthorizedStack" component={UnauthorizedStack} />
      ) : (
        <Stack.Screen name="HomeStack" component={HomeStack} />
      )}
    </Stack.Navigator>
  )
}

export default NavigationSwitch
