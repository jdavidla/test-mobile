import React from 'react'
import { View, Text, Button } from 'react-native'
import styles from './login.style'
import auth from '@react-native-firebase/auth'

const Login = ({ route }) => {
  const onLoginAnonymous = async () => {
    try {
      await auth().signInAnonymously()
      console.log('devug User signed in anonymously')
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('devug Enable anonymous in your firebase console.')
      }

      console.error('devug error', error)
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Login</Text>
      <Text>Route</Text>
      <Text>{JSON.stringify(route)}</Text>
      <Button title="Login Anonymous" onPress={onLoginAnonymous} />
    </View>
  )
}

export default Login
