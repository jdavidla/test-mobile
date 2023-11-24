import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import styles from './login.style'
import auth from '@react-native-firebase/auth'

const Login = ({ route, navigation }) => {
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

  const goToSignUp = () => {
    navigation.navigate('Signup')
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Login</Text>
      <View>
        <TextInput style={styles.textInput} placeholder="email" />
        <TextInput style={styles.textInput} placeholder="password" />
      </View>
      <Button title="Login" />
      <Button title="Login Anonymous" onPress={onLoginAnonymous} />
      <Button title="Register" onPress={goToSignUp} />
    </View>
  )
}

export default Login
