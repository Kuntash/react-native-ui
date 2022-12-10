import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ComponentsScreenNavigation } from './types'

const Components = () => {
  const navigation = useNavigation<ComponentsScreenNavigation>()
  return (
    <View style={[styles.container]}>
      <Button
        title='Circular Progress Bar'
        onPress={() => {
          navigation.navigate('CircularProgressBar')
        }}
      />
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
