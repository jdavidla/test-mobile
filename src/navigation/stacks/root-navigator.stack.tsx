import React, { useContext, FC, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UnauthorizedStack from './unauthorized.stack'
import AuthorizedStack from './authorized.stack'
import { AuthContext } from '../../contexts/auth.context'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

type Props = {
  user: FirebaseAuthTypes.User | null
}

const Stack = createNativeStackNavigator()

const NavigationSwitch: FC<Props> = ({ user }) => {
  const { authenticate } = useContext(AuthContext)

  useEffect(() => {
    authenticate(user)
  }, [user])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="UnauthorizedStack" component={UnauthorizedStack} />
      ) : (
        <Stack.Screen name="AuthorizedStack" component={AuthorizedStack} />
      )}
    </Stack.Navigator>
  )
}

export default NavigationSwitch
