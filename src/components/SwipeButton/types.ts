import { ViewStyle, TextStyle } from 'react-native'
import { BUTTON_SIZES } from '../../constants/swipeButton'
import { SharedValue } from 'react-native-reanimated'

export type SwipeButtonStyle = {
  container: ViewStyle
  swipeable: ViewStyle
  swipeableText: TextStyle
  colorWave: ViewStyle
}
export type SwipeButtonProps = {
  size: keyof typeof BUTTON_SIZES
  isActive: boolean
  title: string
  onActivate: () => void
  onDeactivate: () => void
}
