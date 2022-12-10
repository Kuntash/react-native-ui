import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import Components from '../screens/Components';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Routes = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Components" component={Components} />
      </Stack.Navigator>
  )
}

export default Routes