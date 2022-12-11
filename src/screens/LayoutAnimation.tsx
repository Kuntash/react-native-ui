import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import Animated, {
  Layout,
  SlideInLeft,
  SlideOutRight
} from 'react-native-reanimated'
import React, { useState, useCallback, useRef, useEffect } from 'react'

const LIST_ITEM_COLOR = '#1798DE'

type Item = {
  id: number
}

const LayoutAnimation = () => {
  const [items, setItems] = useState<Item[]>(
    new Array(5).fill(0).map((_, index) => ({ id: index }))
  )

  const initialMode = useRef<boolean>(true)
  const onAdd = useCallback(() => {
    setItems((currentItems) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1
      return [...currentItems, { id: nextItemId }]
    })
  }, [])

  const onDelete = useCallback((itemId: number) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId)
    })
  }, [])

  useEffect(() => {
    initialMode.current = false
  }, [])
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <Text style={{ color: '#fff', fontSize: 40 }}>+</Text>
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {items?.map((item, index) => (
          <Animated.View
            key={item.id}
            style={styles.listItem}
            entering={
              initialMode.current ? SlideInLeft.delay(100 * index) : SlideInLeft
            }
            exiting={SlideOutRight}
            layout={Layout}
            onTouchEnd={() => onDelete(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default LayoutAnimation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 20
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 50,
    right: '5%',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
