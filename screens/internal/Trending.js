import { View, Pressable, StyleSheet, Alert, FlatList, Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import ImageView from "../internal/ImageView";
import { API } from '../../data'

export default function Trending({props}) {

  let {navigation} = props
  const [products, setProducts] = useState([])

  useEffect(async ()=>{
      await fetch(`${API}/products/list_trend`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
      })
      .then(res => res.json())
      .then(res=> {
        setProducts(res.data)

       
      })

      return ()=>{setProducts([])}

  },[])


  const LoadMore = ()=>{
    //   if (current > skip){Alert.alert("Product End Reached")}
      Alert.alert("Product End Reached")
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  



  return (
    <>
          
      <View  style={style.category_text_container}>
        <Text style={style.category_text}>Trending</Text>
      </View>

      <FlatList
          keyExtractor={(item)=>{item._id}}
          data={products}
          numColumns={2}
          onEndReached={()=>{}}
          renderItem={({item})=>{

              return (
            
                  <View style={style.sub_container} >
                      <Pressable style={style.image} onPress={()=>navigation.navigate("Order", {item})} >
                          <ImageView props={{uri: item.image}} />
                      </Pressable>
                  </View>
        
          );
          }}


      />

    </>


  )
}


const style = StyleSheet.create({

  category_text_container: {
    marginTop: 50
  },

  sub_container: {
      margin: 15,
      marginBottom: 0,
  },

  category_text: {
    textTransform: 'uppercase',
    fontWeight:'bold',
    fontSize: 25,
    textAlign: "center"
  },

    
  })