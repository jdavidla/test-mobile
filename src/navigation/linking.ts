import { LinkingOptions, NavigatorScreenParams } from '@react-navigation/native'

type UnauthorizedStackParamList = {
  Login: undefined
}

type AuthorizedStackParamList = {
  Home: undefined
  Profile: undefined
}

export type RootStackParamList = {
  UnauthorizedStack: NavigatorScreenParams<UnauthorizedStackParamList>
  AuthorizedStack: NavigatorScreenParams<AuthorizedStackParamList>
}

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['testmobile://'],
  config: {
    screens: {
      UnauthorizedStack: {
        screens: {
          Login: 'login/:id'
        }
      },
      AuthorizedStack: {
        screens: {
          Home: {
            path: 'home/:id'
          },
          Profile: 'profile/:id'
        }
      }
    }
  }
}

export default linking
