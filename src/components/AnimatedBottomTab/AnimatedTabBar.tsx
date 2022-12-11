import React, { useState, useRef, useEffect } from 'react'
import Svg, { Path } from 'react-native-svg'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  LayoutChangeEvent
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { TabBarComponentProps } from './types'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from 'react-native-reanimated'

const AnimatedSvg = Animated.createAnimatedComponent(Svg)
export const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets()

  const [layout, setLayout] = useState([])

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    setLayout([...layout, { x: event.nativeEvent.layout.x, index }])
  }

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25
  }, [activeIndex, layout])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }]
    }
  })

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        fill='none'
        style={[styles.activeBackground, animatedStyle]}
      >
        <Path
          fill='#604AE6'
          d='M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z'
        />
      </AnimatedSvg>
      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex
          const { options } = descriptors[route.key]
          return (
            <TabBarComponent
              active={active}
              onLayout={(e) => handleLayout(e, index)}
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              options={options}
            />
          )
        })}
      </View>
    </View>
  )
}

const TabBarComponent = ({
  onLayout,
  onPress,
  active,
  options
}: TabBarComponentProps) => {
  const iconRef = useRef(null)
  const animatedCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(active ? 1 : 0, { duration: 250 }) }]
    }
  })

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
    }
  })

  useEffect(() => {
    if (active && iconRef?.current) {
      iconRef.current.play()
    }
  }, [active])
  return (
    <Pressable style={styles.component} onLayout={onLayout} onPress={onPress}>
      <Animated.View style={[styles.componentCircle, animatedCircleStyles]} />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}
      >
        {/* @ts-ignore */}
        {options.tabBarIcon && options.tabBarIcon({ ref: iconRef })}
      </Animated.View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff'
  },
  activeBackground: {
    position: 'absolute'
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'white'
  },
  iconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
