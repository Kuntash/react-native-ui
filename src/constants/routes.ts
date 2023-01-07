import { Route } from '../routes/types'
import AnimatedBottomTab from '../screens/AnimatedBottomTab'
import BottomSheetScreen from '../screens/BottomSheetScreen'
import CircularProgressBar from '../screens/CircularProgressBar'
import LayoutAnimation from '../screens/LayoutAnimation'
import SwipeButtonScreen from '../screens/SwipeButtonScreen'

export const ROUTES: Route[] = [
  {
    _id: 2,
    name: 'CircularProgressBar',
    title: 'Circular Progress Bar',
    component: CircularProgressBar
  },
  {
    _id: 3,
    name: 'LayoutAnimation',
    title: 'Layout Animation',
    component: LayoutAnimation
  },
  {
    _id: 4,
    name: 'AnimatedBottomTab',
    title: 'Animated Bottom Tab',
    component: AnimatedBottomTab
  },
  {
    _id: 5,
    name: 'BottomSheetScreen',
    title: 'Bottom Sheet',
    component: BottomSheetScreen
  },
  {
    _id: 6,
    name: 'SwipeButtonScreen',
    title: 'Swipe Button',
    component: SwipeButtonScreen
  }
]
