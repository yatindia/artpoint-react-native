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


  },[])


  return (
    <View style={style.pdt_container}>

      <View  style={style.pdt_text_container}>
        <Text style={style.pdt_head}>Trending</Text>
      </View>

      <View style={style.pdt_sub_container}>

        {trend.map((info, i)=>{return(

            <ImageBackground resizeMode='cover' source={{uri: info.image}}  key={i}  style={style.pdt_image_container}>

              <View>
                 <View style={style.pdt_press}> 

                 </View>
                 <View style={style.pdt_options}>
                   <Pressable style={style.pressable}> </Pressable>
                   <Image style={style.pdt_fav} source={require("../../assets/icons/heart.png")} />
                   
                   <Image style={style.pdt_view} source={require("../../assets/icons/heart.png")} />
                 </View>
              </View>
              
            </ImageBackground>
            
        )})}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  pdt_press:{},
  pdt_options: {},
  pdt_fav: { 
    width: 20,
    height: 20,
    position: 'absolute',
    tintColor: "red",
    top: 10, right: 10 
    
  },

  pressable: {
    height: 30,
    width:30,
    backgroundColor: "blue"
  },
  
  pdt_view: { 
    width: 20,
    height: 20,
    position: 'absolute',
    tintColor: "blue",
    bottom: -(Dimensions.get("screen").width/3.2), 
    right: 10 
    
  },

  pdt_container: {

  },
    pdt_text_container:{
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
    
      pdt_text: {
        textTransform: 'uppercase',
        fontWeight:'bold'
      },

      pdt_image_container:{
        height:  Dimensions.get("screen").width/3,
        width:  Dimensions.get("screen").width/2.3,
        marginTop: 5,
        marginBottom:5,
        marginLeft: 5,
        marginRight: 5
       
        
  

      },  

      pdt_sub_container:{
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
      },


  
    
    
})