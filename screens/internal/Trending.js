import { View, Pressable, SafeAreaView, ScrollView, StyleSheet, ImageBackground, Dimensions, Image, Alert, FlatList, Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import ImageView from "../internal/ImageView";
import { API } from '../../data'


const [width, height] = [Dimensions.get("screen").width, Dimensions.get("screen").height]

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
                      <Pressable onPress={()=>navigation.navigate("Order", {item})} >
                          <ImageView props={{uri: item.image}} />
                      </Pressable>
                      <View style={style.buttons}>
                          <Pressable style={style.button}>
                              <Image style={style.icon} source={require("../../assets/icons/heart.png")}/>
                          </Pressable>
                          <Pressable onPress={()=>navigation.navigate("ViewProduct", {uri:item.image})} style={style.button}>
                              <Image style={style.icon} source={require("../../assets/icons/eye.png")}/>
                          </Pressable>
                      </View>
                  </View>
        
          );
          }}


      />

    </>


  )
}


const style = StyleSheet.create({

    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    },

    sub_container: {
        
    },

    buttons: {
        flexDirection: "row",
        justifyContent: 'center'
    },
    button: {
  
        width: width/4.2,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: 'center',
        height: 30

    },
    icon: {
        width: 15,
        height: 15,
        tintColor: "#fff"
    },
    category_text_container:{
      width: "92%",
      marginLeft: "4%",
      height: 50,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: "#fff",
      marginTop: 10,
      borderBottomColor: "red",
      borderBottomWidth: 5
    },
  
    category_text: {
      textTransform: 'uppercase',
      fontWeight:'bold'
    },
  
})