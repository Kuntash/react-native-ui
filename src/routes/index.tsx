import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import Components from '../screens/Components'
import CircularProgressBar from '../screens/CircularProgressBar'
import LayoutAnimation from '../screens/LayoutAnimation'
import AnimatedBottomTab from '../screens/AnimatedBottomTab'
import BottomSheetScreen from '../screens/BottomSheetScreen'
import SwipeButton from '../screens/SwipeButtonScreen'
import { ROUTES } from '../constants/routes'
const Stack = createNativeStackNavigator<RootStackParamList>()
const Routes = () => {
  const options = { headerShown: false }
  return (
    <Stack.Navigator>
      <Stack.Screen
        key={1}
        name='Components'
        component={Components}
        options={options}
      />
      {ROUTES.map((route, index) => (
        <Stack.Screen
          key={route._id}
          name={route.name}
          component={route.component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  )
}

export default Routes
