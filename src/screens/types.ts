import { RootStackParamList } from '../routes/types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
export type ComponentsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Components'
>

export type ComponentsScreenNavigation = ComponentsScreenProps['navigation']
