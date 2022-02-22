import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, ScrollView, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import localStorage from "@react-native-async-storage/async-storage"
import {API} from "../data"


export default function Settings() {

  const [login, setLogin] = useState({
    address: "",
    email: "",
    name: "",
    phone: "",
  })

  const [passwords, setPasswords] = useState({
    new_password: "",
    old_password: ""
  })
  

  useEffect(async () => {
      await localStorage.getItem("login")
      .then(res => JSON.parse(res))
      .then(res => {
        setLogin(res.data)
      })

    return () => {
      setLogin({})
    }
  }, [])

  const updatepassword = async () =>{
    console.log({...passwords, _id: login._id});
    await fetch(
      `${API}/distributer/update_password`, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...passwords, _id: login._id})
      })
      .then(res => res.json())
      .then(res =>{
        console.log(res);
        if (res.status) {
          setPasswords({
            new_password: "",
            old_password: ""
          })
          Alert.alert("Password Updated")
        } else {
          Alert.alert("Password Updation failed")
        }
      })
  }
  const updateprofile= async () =>{

    await fetch(
      `${API}/distributer/update`, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({_id: login._id, details:login})
      })
      .then(res => res.json())
      .then(async function (res) {
 
        if (res.status) {
          setLogin(res.data)
          await localStorage.setItem("login", JSON.stringify(res.data))

          Alert.alert("Profile Updated")
        } else {
          Alert.alert("Profile Updation failed")
        }
      })
      
  }


  

  return (
   <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
   style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.sub_container}>
        <Text style={style.title}>Update Details</Text>
          <TextInput value={login.name}    onChangeText={(text)=>{setLogin({...login, name:text})}} style={style.input} placeholder='Name' />
          <TextInput value={login.phone}   onChangeText={(text)=>{setLogin({...login, phone:text})}} style={style.input} placeholder='Email' />
          <TextInput value={login.address} onChangeText={(text)=>{setLogin({...login, address:text})}} style={style.input} placeholder='Address' multiline />
          <Button onPress={()=>{updateprofile()}} title='Update' />
        </View>

        <View style={{...style.sub_container, marginBottom: "30%"}}>
          <Text style={style.title}>Change Password</Text>
          <TextInput onChangeText={(value)=>{setPasswords({...passwords, old_password: value})}} style={style.input} placeholder='Old Password' />
          <TextInput onChangeText={(value)=>{setPasswords({...passwords, new_password: value})}} style={style.input} placeholder='New Password' />
          <Button onPress={()=>{updatepassword()}} title='Change Password' />
        </View>
      </ScrollView>
   </KeyboardAvoidingView>
  )
}

const style = StyleSheet.create({
  container:{
    width: "90%",
    marginLeft: "5%",
    marginTop: "10%",
    flex:1

  },
  sub_container:{
    width: "90%",
    padding: "5%",
    marginLeft: "5%",
    marginTop: "10%",
    marginBottom: "10%",
    flex:1,
    backgroundColor: "#fff",
    elevation: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset:  {width: 0, height: 1 }

  },
  title:{
    textAlign: 'center',
    fontWeight: "bold"
  },
  input:{
    borderBottomColor: "red",
    borderBottomWidth: 1,
    padding: 2,
    marginBottom: 5,
    height: 50
  }
})