import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import { SwipeButtonProps, SwipeButtonStyle } from './types'
import { BUTTON_SIZES } from '../../constants/swipeButton'
import {
  Gesture,
  GestureDetector,
  PanGestureHandler
} from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  Value,
  cond,
  floor,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export const SwipeButton = (props: SwipeButtonProps) => {
  const { size, title, isActive, onActivate, onDeactivate } = props
  const { height, padding, width, fontSize } = BUTTON_SIZES[size]
  const swipeableDimensions = height - 2 * padding // 80
  const horizontalWaveRange = swipeableDimensions + 2 * padding
  const horizontalSwipeRange = width - 2 * padding - swipeableDimensions

  const swipeableX = useSharedValue(isActive ? horizontalSwipeRange : 0)
  const context = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = swipeableX.value
    })
    .onUpdate((e) => {
      const totalTranslationX = e.translationX + context.value
      if (totalTranslationX > 0 && totalTranslationX < horizontalSwipeRange)
        swipeableX.value = totalTranslationX
    })
    .onEnd((e) => {
      const totalTranslationX = e.translationX + context.value
      if (totalTranslationX <= horizontalSwipeRange / 2)
        swipeableX.value = withSpring(0)
      else if (totalTranslationX > horizontalSwipeRange / 2) {
        swipeableX.value = withSpring(horizontalSwipeRange)
      }
    })

  useAnimatedReaction(
    () => {
      if (swipeableX.value === horizontalSwipeRange && !isActive) {
        runOnJS(onActivate)()
      } else if (swipeableX.value === 0 && isActive) {
        runOnJS(onDeactivate)()
      }
    },
    () => {},
    [swipeableX.value]
  )

  const animatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: swipeableX.value }],
        backgroundColor: interpolateColor(
          swipeableX.value,
          [0, horizontalSwipeRange],
          ['#06d6a0', '#fff']
        )
      }
    }),
    swipeableText: useAnimatedStyle(() => ({
      transform: [
        {
          translateX: interpolate(
            swipeableX.value,
            [0, horizontalSwipeRange],
            [0, horizontalSwipeRange / 2],
            Extrapolate.CLAMP
          )
        }
      ],
      opacity: interpolate(
        swipeableX.value,
        [0, horizontalSwipeRange],
        [0.8, 0],
        Extrapolate.CLAMP
      )
    })),
    colorWave: useAnimatedStyle(() => ({
      width: horizontalWaveRange + swipeableX.value,
      opacity: interpolate(swipeableX.value, [0, horizontalSwipeRange], [0, 1])
    }))
  }

  useEffect(() => {
    if (isActive) swipeableX.value = withSpring(horizontalSwipeRange)
    else swipeableX.value = withSpring(0)
  }, [isActive])
  return (
    <View
      style={[
        styles.container,
        { height, padding, width, borderRadius: height / 2 }
      ]}
    >
      <Animated.Text
        style={[
          styles.swipeableText,
          { fontSize },
          animatedStyles.swipeableText
        ]}
      >
        {title}
      </Animated.Text>
      <AnimatedLinearGradient
        colors={['#06d6a0', '#1b9aaa']}
        end={{ x: 1.0, y: 0.5 }}
        start={{ x: 0.0, y: 0.5 }}
        style={[
          styles.colorWave,
          { height, borderRadius: height / 2 },
          animatedStyles.colorWave
        ]}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.swipeable,
            {
              width: swipeableDimensions,
              height: swipeableDimensions,
              borderRadius: swipeableDimensions / 2,
              left: padding
            },
            animatedStyles.swipeable
          ]}
        />
      </GestureDetector>
      {/* <Text>{title}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create<SwipeButtonStyle>({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  swipeableText: {
    fontWeight: 'bold',
    color: '#1b9a'
  },
  colorWave: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#777'
  },
  swipeable: {
    position: 'absolute'
  }
})
