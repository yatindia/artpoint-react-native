import { View, Pressable, SafeAreaView,  StyleSheet, Dimensions, Image, FlatList, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import ImageView from "../internal/ImageView";
import { API } from '../../data'
import localStorage from "@react-native-async-storage/async-storage"
import { useIsFocused } from '@react-navigation/native'
const [width, height] = [Dimensions.get("screen").width, Dimensions.get("screen").height]

export default function Favorites({navigation}) {

  const isFocused = useIsFocused();

  const [products, setProducts] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [fav, setFav] = useState([])

 

  useEffect(async () => {

    let id = await localStorage.getItem("login")
            .then(res=> JSON.parse(res))
            .then(res => {
              
                return res.data._id
            })
    await fetch(`${API}/distributer/fav`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({_id:id})
      })
      .then(res => res.json())
      .then(res=> { setFav(res.data) })

  
    return () => {
      setFav([])
    }
  }, [refresh])
  



  useEffect(async ()=>{



      await fetch(`${API}/products/my_fav`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({fav})
      })
      .then(res => res.json())
      .then(res=> { setProducts(res.data) })

      return ()=>{
        setProducts([])

      }


  },[fav])

  const checkFav = (id)=>{
      let result = fav.filter((item)=>{
          if (id == item) { return "ok"}
      })

      if (result.length > 0) {return "red"}
      else{  return "grey"}
  }


  const updateFav = async (id)=>{

    let _id = await localStorage.getItem("login")
    .then(res=> JSON.parse(res))
    .then(res => {
      
        return res.data._id
    })

      let result = fav.filter((item)=>{
          if (id == item) { return "ok"}
      })

      let query = {
          operation: "add",
          pdt_id: id,
          _id: _id
      }

      if (result.length > 0) { query.operation = "remove"; }

      await fetch(`${API}/distributer/edit_fav`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(query)
      })
      .then(res => res.json())
      .then(res=> { 
          setRefresh(refresh+1)
        })

      

  }


  useEffect(()=>{
      
    setRefresh(refresh+1)
  

  return ()=>{setRefresh(0)}
},[isFocused])





  return (
    <SafeAreaView>

<Button onPress={()=>{setRefresh(refresh+1)}} title="reFresh"/>
        <FlatList
        keyExtractor={(item)=>{item._id}}
            data={products}
            numColumns={2}
            collapsable={true}
            renderItem={({item})=>{


                return (
               
                    <View style={style.sub_container} >
                        <Pressable style={style.image} onPress={()=>navigation.navigate("Order", {item})} >
                            <ImageView props={{uri: item.image}} />
                        </Pressable>
                        <View style={style.buttons}>
                            <Pressable onPress={()=>{updateFav(item._id)}} style={style.button}>
                                <Image style={{...style.icon, tintColor: checkFav(item._id)}} source={require("../../assets/icons/heart.png")}/>
                            </Pressable>
                            <Pressable onPress={()=>navigation.navigate("ViewProduct", {uri:item.image})} style={style.button}>
                                <Image style={{...style.icon, tintColor: "grey"}} source={require("../../assets/icons/eye.png")}/>
                            </Pressable>
                        </View>
                    </View>
          
            );
            }}
         />

         
    </SafeAreaView>
  )
}


const style = StyleSheet.create({

    image : {
        borderRadius: 10,
        // backgroundColor: "red",
        overflow: 'hidden'
      },

    container: {
        // flexDirection: "row",
        // flexWrap: "wrap"
 
    },

    sub_container: {
        margin: 15,
        marginBottom: 0,
    },

    buttons: {
        flexDirection: "row",
        justifyContent: 'center',
        margin: 0,
        padding: 0
    },
    button: {
        width: width/4.2,
        justifyContent: "center",
        alignItems: 'center',
        height: 30,
        backgroundColor: "#fff",
        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        marginTop: -15,
        elevation: 1
        
    },
    icon: {
        width: 15,
        height: 15,
        // tintColor: "grey",
    }
})