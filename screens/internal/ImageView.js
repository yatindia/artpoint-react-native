import { View, Text, Dimensions, ImageBackground } from 'react-native'
import React from 'react'



export default function ImageView({props}) {

    let image = {uri: props.uri}

  const [visible, setIsVisible] = React.useState(false);

const [width, height] = [Dimensions.get("screen").width, Dimensions.get("screen").height]

  return (
  <>
    <ImageBackground 
    resizeMode= 'contain'
    style={{
      height: width/3.5,
      width:width/2-30,
      }} source={image}/>
  </>
    
  )
}