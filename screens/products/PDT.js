import { View, Pressable, SafeAreaView,  StyleSheet, Dimensions, Image, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import ImageView from "../internal/ImageView";
import { API } from '../../data'
import localStorage from "@react-native-async-storage/async-storage"
import { useIsFocused } from '@react-navigation/native'
const [width, height] = [Dimensions.get("screen").width, Dimensions.get("screen").height]

export default function PDT({navigation}) {

  const isFocused = useIsFocused();

  const {subCategory, category} = navigation.state.params
  const [products, setProducts] = useState([])

  const [refresh, setRefresh] = useState(0)
  const [fav, setFav] = useState([])

  useEffect(()=>{
  setRefresh(refresh+1)
  setRefresh(refresh+1)

  return ()=>{setRefresh(0)}
},[isFocused])


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

      await fetch(`${API}/products/list_by_category`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({subCategory, category})
      })
      .then(res => res.json())
      .then(res=> { setProducts(res.data) })

      return ()=>{
        setProducts([])

      }


  },[refresh])

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






  return (
    <SafeAreaView style={{marginBottom: 36, minHeight: "90%"}}>

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
      <Pressable 
      android_ripple={true}
        style={GStyle.button} 
        onPress={()=>{setRefresh(refresh+1)}}>
        <Image style={{...GStyle.icon, tintColor: "#fff"}} source={require("../../assets/icons/refresh.png")}/>
      </Pressable>
         
    </SafeAreaView>
  )
}


const style = StyleSheet.create({

    image : {
        borderRadius: 10,
        // backgroundColor: "red",
        overflow: 'hidden',
        elevation: 5

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
        padding: 0,
        elevation: 6
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

const GStyle = StyleSheet.create({

  button: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      elevation: 3,
      backgroundColor: 'red',
      position: 'absolute',
      bottom:"5%",
      right: 20
    },

    icon: {
      width: 15,
      height: 15,
      // tintColor: "grey",
  }
})