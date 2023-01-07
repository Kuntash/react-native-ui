export type RootStackParamList = {
  Components: undefined
  CircularProgressBar: undefined
  LayoutAnimation: undefined
  AnimatedBottomTab: undefined
  BottomSheetScreen: undefined
  SwipeButtonScreen: undefined
}

export type Route = {
  _id: number | string
  title: string
  name: keyof RootStackParamList
  component: () => JSX.Element
}
