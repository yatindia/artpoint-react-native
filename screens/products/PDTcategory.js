import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import { SliderBox } from "react-native-image-slider-box";
import {API} from "../../data"
import Trending from '../internal/Trending';
import { ScrollView } from 'react-native-virtualized-view';

export default function PDTcategory({navigation}) {

  const [image, setImage] = useState([])
  const [category, setcategory] = useState([])
  useEffect(async ()=>{

    try {

    await fetch(`${API}/trends`,{method : "POST"})
    .then(res => res.json())
    .then(res=> setImage(res.data))
    
      await fetch(`${API}/products/category/list`, {method : "POST"})
      .then(res => res.json())
      .then(res=> {
        setcategory(res.data)
     
        
      })
    } catch (error) {}

    return ()=>{
      setcategory([])
      setImage([])
    }


  },[])

  return (
    <SafeAreaView>
        <ScrollView>
        <SliderBox autoplay={true} circleLoop={true} images={image} />
      <View style={style.category_container}>

        {
          category.map((data, index)=>{

            return (
            <View key={index}>
            <View  style={style.category_text_container}>
              <Text style={style.category_text}>{data.category}</Text>
            </View>

            <View style={style.category_sub_container}>

                {
                  data.subCategory.map((info, i)=>{

                    return(
                      
                      
                        <Pressable onPress={()=>{navigation.navigate("Products", {subCategory: info.text, category:data.category})}} key={i}>
                            <View style={style.category_image_container}>
                                <Image style={style.category_image} source={{uri:info.image}} />
                                <Text style={style.subCategory_text}>{info.text}</Text>
                            </View>
                        </Pressable>
                      
                    
                    )
                  })
                }

            </View>
           
            </View>
            )
          })
        }

      </View>
      <Trending props={{navigation}}/>
        </ScrollView>
    </SafeAreaView>
  );
}



const style = StyleSheet.create({
  category_container: {

  },
  category_sub_container:{
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "center"
  },
  
  category_image_container:{
    padding: 6,
    elevation: 5
  },

  category_text_container:{
    width: "92%",
    marginLeft: "4%",
    height: 50,
    justifyContent:'center',
    alignItems: 'center',
    // backgroundColor: "#fff",
    marginTop: 10,
    // borderBottomColor: "red",
    // borderBottomWidth: 5
  },

  category_text: {
    textTransform: 'uppercase',
    fontWeight:'bold',
    fontSize: 25
  },

  subCategory_text: {
    textAlign:"center",
    color:"#000",
    fontSize: 8,
    textTransform: 'capitalize',
    paddingTop: 5
  },

  category_image : {
    width: Dimensions.get("screen").width/5.5,
    height: Dimensions.get("screen").width/5.5,
    borderRadius: 5

  }
})