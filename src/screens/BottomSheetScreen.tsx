import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  GestureHandlerRootView,
  TouchableOpacity
} from 'react-native-gesture-handler'
import { BottomSheet } from '../components/BottomSheet'

const BottomSheetScreen = () => {
  const ref = useRef<BottomSheetRefProps>(null)
  const onPress = useCallback(() => {
    ref?.current?.scrollTo(-100)
  }, [])
  return (
    <GestureHandlerRootView style={[styles.container]}>
      <StatusBar style='light' />
      <TouchableOpacity style={styles.button} onPress={onPress} />
      <BottomSheet ref={ref} />
    </GestureHandlerRootView>
  )
}

export default BottomSheetScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 50,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    opacity: 0.6
  }
})
