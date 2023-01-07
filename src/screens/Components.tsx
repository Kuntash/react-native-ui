import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ComponentsScreenNavigation } from './types'
import { ROUTES } from '../constants/routes'

const Components = () => {
  const navigation = useNavigation<ComponentsScreenNavigation>()
  return (
    <View style={[styles.container]}>
      {ROUTES.map((route, index) => (
        <Button
          key={route._id}
          title={route.title}
          onPress={() => {
            navigation.navigate(route.name)
          }}
        />
      ))}
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
