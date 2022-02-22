import { View, Text, Pressable, StyleSheet, Image, Linking} from 'react-native'
import React, {useEffect, useState} from 'react'
import { API } from '../../data'

export default function Marketeer({id}) {



  const [marketeer, setMarketeer] = useState({name : "", phone : "", email : ""})





  useEffect(async ()=>
  {


   
      if (id != "NO") {
        await fetch(`${API}/marketeer/list`,
          {
            method: "post",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({_id: id})

          })
          .then(res => res.json())
          .then(res => {

              if (res.status) {
                setMarketeer(res.data);
              }
          })
      }
  

      return ()=>{
        setMarketeer({name : "", phone : "", email : ""});
      }

   
  }, [id])

 
  if (id == "NO" ) {
    return(
     <View style={style.container}>
     <Text style={style.text}>No Agent Assigned Yet</Text>
 
   </View>
    )
  }
 


  return (
    <View style={style.container}>
      <Text style={style.text}>Agent Name: {marketeer.name}</Text>

      <View style={style.buttons}>
          <Pressable 
            onPress={()=>{Linking.openURL(`tel:${marketeer.phone}`)}}
            style={{...style.button, backgroundColor: "#fff"}}>
            <Image style={style.icon} source={require("../../assets/icons/phone-call.png")}/>
          </Pressable>
          
          <Pressable 
            onPress={()=>{Linking.openURL(`whatsapp:91${marketeer.phone}`)}}
            style={{...style.button, backgroundColor: "green"}}>
          <Image style={style.icon} source={require("../../assets/icons/whatsapp.png")}/>
          </Pressable>
      </View>

    </View>
  )
}

const style = StyleSheet.create({
  container:{

  },
  text:{
    textAlign: 'center'
  },
  buttons:{
    flexDirection: "row",
    width: "95%",
    marginLeft: "2.5%",
    marginBottom: 20,
    marginTop: 20,
  },

  button:{
    width: "40%",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "red",
    height: 60,
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 10,
    elevation: 5
  },

  icon: {
    height: 30,
    width: 30
  }
})