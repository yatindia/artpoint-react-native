import { View, Text, Alert, StyleSheet, FlatList, Pressable, Button, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import { API } from '../../data'
import localStorage from "@react-native-async-storage/async-storage"
import { useIsFocused } from '@react-navigation/native'

export default function Order({navigation}) {
  const isFocused = useIsFocused();

  const [myOrder, setMyOrder] = useState([])
  const [refresh, setRefresh] = useState(0)
  useEffect(async () => {

    let login = await localStorage.getItem("login")
    let id = (JSON.parse(login)).data._id
    await fetch(`${API}/distributer/my_orders`,{
      method: "post",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({_id: id})
    })
    .then(res => res.json())
    .then(res => {
      if (res.status) {
        setMyOrder(res.data)
      } else {
        Alert.alert("Somthing went wrong")
      }
    })

    return ()=>{
      setMyOrder([])
      setRefresh(0)
    }
  
   
  }, [refresh])

  useEffect(()=>{
    setRefresh(refresh+1)

    return ()=>{setRefresh(0)}
  },[isFocused])

  
  

  return (
    <SafeAreaView style={{marginBottom: 36}}>
      <Button onPress={()=>{setRefresh(refresh+1)}} title="Refresh" />
      <FlatList
      keyExtractor={(item)=>item._id}
      data={myOrder}
      renderItem={({item})=>{
        return (
          <Pressable onPress={()=>navigation.navigate("Order Details", {data: item})}>
              <View style={s.container}>
              <View style={s.dateContainer}>
                <Text style={s.orderDate}>{((item.order_date).split("T")[0]).split("-")[2]}</Text>
                <Text style={s.orderDate2}>{((item.order_date).split("T")[0]).split("-")[1]} {((item.order_date).split("T")[0]).split("-")[0]}</Text>
              </View>
              <View style={s.statusContainer}>
                <Text><Text style={s.bold}>{item.category}</Text>: {item.subCategory}</Text>
                <Text><Text style={s.bold}>Status</Text>: {item.status}/6</Text>
              </View>
            </View>
          </Pressable>
        )
      }}
       />
    </SafeAreaView>
  )
}


const s = StyleSheet.create({
  container : {
    flexDirection: 'row',
    width: "95%",
    marginLeft: "2.5%",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    marginTop: 10,
    marginBottom: 5
  },
  dateContainer:{
    width: "20%",
    backgroundColor: "red",
    padding: 2,
    borderRadius: 5
  },
  orderDate:{
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#fff"
  },
  orderDate2: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#fff"
  },
  statusContainer:{
    width: "70%",
    marginLeft: "10%",
    justifyContent: 'center',
  },

  bold: {fontWeight: 'bold'}
})