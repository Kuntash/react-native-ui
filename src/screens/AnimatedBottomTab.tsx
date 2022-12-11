import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  createBottomTabNavigator,
  BottomTabBarProps
} from '@react-navigation/bottom-tabs'
import {
  AnimatedTabBar,
  PlaceHolderScreen
} from '../components/AnimatedBottomTab'
import { BottomTabParamList } from '../components/AnimatedBottomTab/types'
import Lottie from 'lottie-react-native'

const Tab = createBottomTabNavigator<BottomTabParamList>()
export const AnimatedBottomTab = () => {
  return (
    <>
      <StatusBar style='dark' />
      <Tab.Navigator tabBar={(props) => <AnimatedTabBar {...props} />}>
        <Tab.Screen
          name='Home'
          component={PlaceHolderScreen}
          options={{
            // @ts-ignore
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('../../assets/images/home.icon.json')}
                style={styles.icon}
              />
            )
          }}
        />
        <Tab.Screen
          name='Upload'
          component={PlaceHolderScreen}
          options={{
            // @ts-ignore
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('../../assets/images/upload.icon.json')}
                style={styles.icon}
              />
            )
          }}
        />
        <Tab.Screen
          name='Chat'
          component={PlaceHolderScreen}
          options={{
            // @ts-ignore
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('../../assets/images/chat.icon.json')}
                style={styles.icon}
              />
            )
          }}
        />
        <Tab.Screen
          name='Settings'
          component={PlaceHolderScreen}
          options={{
            // @ts-ignore
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('../../assets/images/settings.icon.json')}
                style={styles.icon}
              />
            )
          }}
        />
      </Tab.Navigator>
    </>
  )
}

export default AnimatedBottomTab

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36
  }
})
