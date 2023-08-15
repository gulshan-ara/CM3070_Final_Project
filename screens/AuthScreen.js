import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AuthScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AuthScreen</Text>
    </SafeAreaView>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})