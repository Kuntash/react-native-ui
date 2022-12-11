import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Circle, Svg } from 'react-native-svg'
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { ReText } from 'react-native-redash'

const BACKGROUND_COLOR = '#444B6F'
const BACKGROUND_STROKE_COLOR = '#303858'
const STROKE_COLOR = '#A5E1FA'

const { width, height } = Dimensions.get('window')

const CIRCLE_LENGTH = 1000
const R = CIRCLE_LENGTH / (2 * Math.PI)

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedText = Animated.createAnimatedComponent(Text)
const CircularProgressBar = () => {
  const progress = useSharedValue<number>(0)

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value)
  }))
  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`
  }, [progress.value])

  const onPress = useCallback(() => {
    progress.value = withTiming(1, { duration: 2000 })
  }, [])

  return (
    <View style={[styles.container]}>
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{ position: 'absolute' }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap='round'
        />
      </Svg>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CircularProgressBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256, 256, 256, 0.7)'
  },
  button: {
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    position: 'absolute',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 25,
    color: '#fff',
    letterSpacing: 2.0
  }
})
