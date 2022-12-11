import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { LayoutChangeEvent } from 'react-native'

export type BottomTabParamList = {
  Home: undefined
  Upload: undefined
  Chat: undefined
  Settings: undefined
}

export type TabBarComponentProps = {
  onLayout: (e: LayoutChangeEvent) => void
  onPress: () => void
  active?: boolean
  options: BottomTabNavigationOptions
}
