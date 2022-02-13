import { View, Pressable, SafeAreaView, ScrollView, StyleSheet, ImageBackground, Dimensions, Image, Alert, FlatList, Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import ImageView from "../internal/ImageView";
import { API } from '../../data'


const [width, height] = [Dimensions.get("screen").width, Dimensions.get("screen").height]

export default function PDT({navigation}) {

  const {subCategory, category} = navigation.state.params
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [current, setCurrent] = useState(0)
  

  useEffect(async ()=>{
      await fetch(`${API}/products/list_by_category`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({subCategory, category})
      })
      .then(res => res.json())
      .then(res=> {
        setProducts(res.data)
        setCurrent(res.data.length)
       
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
    <SafeAreaView>


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


        {/* <ScrollView >

            <View style={{height}}></View>

            <View style={style.container}>

                {
                    products.map((product, index)=>{
                        return (
               
                                <View style={style.sub_container} key={index}>
                                    <Pressable>
                                    <ImageBackground style={{height: width/3.5,width:width/2-10, margin: 5}} source={{uri: product.image}}/>
                                    </Pressable>
                                    <View style={style.buttons}>
                                        <Pressable style={style.button}>
                                            <Image style={style.icon} source={require("../../assets/icons/heart.png")}/>
                                        </Pressable>
                                        <Pressable style={style.button}>
                                            <Image style={style.icon} source={require("../../assets/icons/eye.png")}/>
                                        </Pressable>
                                    </View>
                                </View>
                      
                        );
                    })
                }

            </View>

        </ScrollView> */}
    </SafeAreaView>
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
    }
})