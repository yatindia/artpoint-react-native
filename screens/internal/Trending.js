import { View, Pressable, StyleSheet, Alert, FlatList, Text, Dimensions} from 'react-native'
import React, {useEffect, useState} from 'react'
import ImageView from "../internal/ImageView";
import { API } from '../../data'

export default function Trending({props}) {

  let {navigation} = props
  const [products, setProducts] = useState([])

  useEffect(async ()=>{
    let unmounted = false
      await fetch(`${API}/products/list_trend`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
      })
      .then(res => res.json())
      .then(res=> {
        
        if (!unmounted) {
          setProducts(res.data)
        }

       
      })

      return ()=>{
        unmounted = true
      }

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
    <>
          
      <View  style={style.category_text_container}>
        <Text style={style.category_text}>Trending</Text>
      </View>

      <FlatList
          keyExtractor={(item)=>{item._id}}
          data={products}
          numColumns={2}
          onEndReached={()=>{}}
          renderItem={({item})=>{

              return (
            
                  <View style={style.sub_container} >
                      <Pressable style={style.image} onPress={()=>navigation.navigate("Order", {item})} >
                          <ImageView props={{uri: item.image}} />
                      </Pressable>
                  </View>
        
          );
          }}


      />

    </>


  )
}


// const style = StyleSheet.create({

//   category_text_container: {
//     marginTop: 50
//   },

//   sub_container: {
//       margin: 10,
//       marginBottom: 0,
//       padding: 5,
//       backgroundColor:"brown",
//       borderRadius: 5
//   },

//   category_text: {
//     textTransform: 'uppercase',
//     fontWeight:'bold',
//     fontSize: 25,
//     textAlign: "center"
//   },

    
//   })

const [width, height] = [Dimensions.get("screen").width, Dimensions.get("screen").height]

const style = StyleSheet.create({

  category_text: {
    textTransform: 'uppercase',
    fontWeight:'bold',
    fontSize: 25,
    textAlign: "center",
    marginTop: "5%"
  },

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
