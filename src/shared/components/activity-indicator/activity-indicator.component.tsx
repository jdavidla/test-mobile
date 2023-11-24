import React from 'react'
import { View, ActivityIndicator as Spinner } from 'react-native'
import styles from './activity-indicator.styles'

const ActivityIndicator = () => {
  return (
    <View style={styles.root}>
      <Spinner size="large" color="red" />
    </View>
  )
}

export default ActivityIndicator
