import { View, Text, StyleSheet, Dimensions, Image,ImageBackground, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import {API} from "../../data"

export default function Trending() {

  const [trend, setTrend] = useState([])

  useEffect(async ()=>{

 
    try {
    
      await fetch(`${API}/products/list_trend`, {method : "POST"})
      .then(res => res.json())
      .then(res=> {
        setTrend(res.data)
        
      })
    } catch (error) {}


    return ()=>{setTrend([])}


  },[])


  return (
    <View>

      <View  style={style.pdt_text_container}>

        <Text style={style.pdt_head}>
          Trending
        </Text>

      </View>

      <View style={style.pdt_sub_container}>

        {trend.map((info, i)=>{return(

            <ImageBackground resizeMode='cover' source={{uri: info.image}}  key={i}  style={style.pdt_image_container} >
            </ImageBackground>

         

            
        )})}
      </View>
    </View>
  )
}

const [width, height] = [Dimensions.get("screen").width, Dimensions.get("screen").height ]

const style = StyleSheet.create({

    pdt_text_container:{
        width: width,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: 10,
        borderBottomColor: "red",
        borderBottomWidth: 5,
        

      },
    
      pdt_head: {
        textTransform: 'uppercase',
        fontWeight:'bold'
      },

      pdt_sub_container:{
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
      },


      pdt_image_container:{
        height:  width/3.5,
        width:  width/2 -20,
        margin: 10


      },  

     
    
    
})