import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const Components = () => {
  return (
    <View style={[styles.container]}>
      <Button title='Example' />
    </View>
  )
}

export default Components

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 2
  },
  button: {
    backgroundColor: '#'
  }
})
