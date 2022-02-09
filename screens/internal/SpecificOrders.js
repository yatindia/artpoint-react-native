import { View, Text } from 'react-native'
import React from 'react'

export default function SpecificOrders({navigation}) {


const {itemId} = navigation.state.params

  return (
    <View>
      <Text>{itemId} </Text>
    </View>
  )
}