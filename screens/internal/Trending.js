import { View, Text, StyleSheet, Dimensions, Image,ImageBackground, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import {API} from "../../data"
import localStorage from "@react-native-async-storage/async-storage"

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


    return ()=>{
      setTrend([])
      
    }


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

            <Pressable key={i}>
                <ImageBackground  resizeMode='cover' source={{uri: info.image}}    style={style.pdt_image_container} >
                <Image 
                    source={require("../../assets/icons/heart.png")} 
                    style={{
                      ...style.pdt_heart
                    }} 
                  />
              </ImageBackground>

            </Pressable>
         

            
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

      pdt_heart:{
        width: 15,
        height: 15,
        top:5,
        left:5
      }

     
    
    
})