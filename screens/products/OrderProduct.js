import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import Order from "../internal/Order"

export default function OrderProduct({navigation}) {

  const [items, setItems] = useState(null)
 

  useEffect(() => {
    
    setItems(navigation.state.params.item)

  
    return () => {
      setItems({})
    }
  }, [])

  if (items == null) {
    return (
      <View>
        <Text>nullt</Text>
      </View>
    )
  }else {
    return (
      <Order props={items} />
    )
  }
  
  
}