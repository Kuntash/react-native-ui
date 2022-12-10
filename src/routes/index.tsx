import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import Components from '../screens/Components'
import CircularProgressBar from '../screens/CircularProgressBar'
const Stack = createNativeStackNavigator<RootStackParamList>()
const Routes = () => {
  const options = { headerShown: false }
  return (
    <Stack.Navigator>
      <Stack.Screen name='Components' component={Components} />
      <Stack.Screen
        name='CircularProgressBar'
        component={CircularProgressBar}
        options={options}
      />
    </Stack.Navigator>
  )
}

export default Routes
