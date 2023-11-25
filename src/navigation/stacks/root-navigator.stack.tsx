import React, { useContext, FC, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UnauthorizedStack from './unauthorized.stack'
import AuthorizedStack from './authorized.stack'
import { AppContext } from '../../contexts/app.context'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

type Props = {
  user: FirebaseAuthTypes.User | null
  deepLink: string | null
}

const Stack = createNativeStackNavigator()

const NavigationSwitch: FC<Props> = ({ user, deepLink }) => {
  const { setDeepLink } = useContext(AppContext)

  useEffect(() => {
    if (deepLink) setDeepLink(deepLink)
  }, [deepLink, setDeepLink])

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
