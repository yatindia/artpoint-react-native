import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import PinchZoomView from 'react-native-pinch-zoom-view';
console.warn = () => {}

export default function ViewProduct({navigation}) {
    const {uri} = navigation.state.params

    const [sizeValue, setSizeValue] = useState({
        height: 10,
        width: 10
    })

    useEffect(()=>{
        Image.getSize(uri, (width,height)=>{
            // const ratio = win.width/w; //541 is actual image width
            // const height = h * ratio
            setSizeValue({
               height, width
            })
         })

    },[])


  return (
    <View style={style.container}>

<PinchZoomView maxScale={10} >
<Image style={{height: sizeValue.height * (Dimensions.get("screen").width/sizeValue.width), width:Dimensions.get("screen").width}} source={{uri}} />


</PinchZoomView>

        


    
    </View>
  )
}



const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})


