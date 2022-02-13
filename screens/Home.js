import { View, Text, StyleSheet, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';

import {API} from "../data"
import {PDTNavigation} from "../router/stackNavi"

export default function Home() {

  // const [image, setImage] = useState([])
  // const [category, setcategory] = useState([])
  // useEffect(async ()=>{

  //   await fetch(`${API}/trends`,{method : "POST"})
  //   .then(res => res.json())
  //   .then(res=> setImage(res.data))

  //   try {
    
  //     await fetch(`${API}/products/category/list`, {method : "POST"})
  //     .then(res => res.json())
  //     .then(res=> {
  //       setcategory(res.data)
        
  //     })
  //   } catch (error) {}


  // },[])

  return (

      <PDTNavigation/>
  
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

  subCategory_text: {
    textAlign:"center",
    backgroundColor: "red",
    fontWeight: "bold",
    color:"#fff",
  },

  category_image : {
    width: Dimensions.get("screen").width/3.5,
    height: Dimensions.get("screen").width/3.5
  }
})