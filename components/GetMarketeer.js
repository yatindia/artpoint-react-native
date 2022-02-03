import React, { useState,useEffect } from "react";
import { Text, View, Button, Linking, Alert, StyleSheet, Image, TouchableOpacity} from "react-native";
import { API } from "../data";
import Clipboard from "@react-native-community/clipboard"

export default function GetMarketeer({id}) {

    let [data, setData] = useState({
      name: "",
      phone: "",
      email: ""
    })

    useEffect(async ()=>{

    await fetch(`${API}/marketeer/list`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      })
        .then((response) => response.json())
        .then((json) => {
            let info = json.data
            setData({...data, ...info })

        });
    }, [])

    const handleCall= (datum) => {

      Linking.openURL(`tel:${datum}`)
    }
    const handleWhatsapp= (datum) => {
      let message = "Hi"

      Linking.openURL(`whatsapp://send?=${message}&phone=91${datum}`)
      .catch(err => Alert.alert("Please Check That you have Whatsapp"))
    }


  return (
    <View>

      <View style={styles.button_containers}>
        <TouchableOpacity style={{...styles.buttons, ...styles.call}}  onPress={() => handleCall(data.phone)}>
          <Image style={styles.img} source={require("../assets/icons/phone-call.png")}/>
      
        </TouchableOpacity>

        <TouchableOpacity style={{...styles.buttons, ...styles.whatsapp}} onPress={() => handleWhatsapp(data.phone)} >
    
            <Image style={styles.img} source={require("../assets/icons/whatsapp.png")}/>

        </TouchableOpacity>
      </View>

        {/* <Button style={styles.normal_button} title="call Marketeer" onPress={() => handleCall(data.phone)}/>
        <Button color={"green"}  title="Connect With Whatsapp" onPress={() => handleWhatsapp(data.phone)}/> */}

         <Text>Name {data.name} </Text>    
         <Text>Phone {data.phone}</Text>
         <Text>Email {data.email}</Text> 

    </View>
  );
}


const styles = StyleSheet.create({
  normal_button: {
    backgroundColor: "blue"
  },
  button_containers:{
    flexDirection: "row",

  },
  buttons:{
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    margin: "5%",
    borderRadius:5,
    elevation:10
  },
  img : {
    width: 50,
    height: 50
  },
  call:{
    backgroundColor: "white",
   
  },
  whatsapp: {
    backgroundColor: "green",
    
  }
})