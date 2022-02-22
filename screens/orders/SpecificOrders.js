import { View, Text} from 'react-native'
import React, {useState, useEffect} from 'react'
import ViewOrder from "../internal/ViewOrder"

export default function OrderProduct({navigation}) {

  const [items, setItems] = useState(null)
 

  useEffect(() => {
    
    setItems(navigation.state.params.data)
    

  
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
      <ViewOrder props={{data:items,navigation}} />
    )
  }
  
  
}