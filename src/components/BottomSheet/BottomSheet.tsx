import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

export const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  (props, ref) => {
    const translateY = useSharedValue<number>(0)
    const context = useSharedValue({ y: 0 })

    const scrollTo = useCallback((destination: number) => {
      'worklet'
      translateY.value = withSpring(destination, { damping: 50 })
    }, [])

    useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value }
      })
      .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 2) {
          scrollTo(0)
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y)
        }
      })

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      )
      return {
        transform: [{ translateY: translateY.value }],
        borderRadius
      }
    })

    useEffect(() => {
      scrollTo(-SCREEN_HEIGHT / 3)
    }, [])
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={[styles.line]} />
        </Animated.View>
      </GestureDetector>
    )
  }
)

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2
  }
})
