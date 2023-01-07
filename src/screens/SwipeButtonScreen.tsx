import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SwipeButton } from '../components/SwipeButton'
import { useSharedValue } from 'react-native-reanimated'

/* limitation: Each button should have a separate state */
const SwipeButtonScreen = () => {
  const [isActive, setIsActive] = useState(true)
  return (
    <View style={styles.container}>
      <SwipeButton
        size='base'
        isActive={isActive}
        title='Swipe me'
        onActivate={() => {
          console.log('Button swiped forward')
          setIsActive(true)
        }}
        onDeactivate={() => {
          console.log('Button swiped back')
          setIsActive(false)
        }}
      />
    </View>
  )
}

export default SwipeButtonScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eaeaea'
  }
})
