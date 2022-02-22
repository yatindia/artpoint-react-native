import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,Image, Pressable, KeyboardAvoidingView } from 'react-native';
import {GStyle} from "../screens/global.style"
import { API } from "../data"
import localStorage from "@react-native-async-storage/async-storage"


export default function Login({ navigation }) {

  const [userName, setUserName] = useState('vas@niko.com');
  const [password, setPassword] = useState('123');
  const [err, setErr] = useState(false)

  const handleLogin = async () => {

    if (userName == '' || password == '') { setErr(true);}

    else {
      await fetch(`${API}/distributer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userName,
          password: password
        })
      })

        .then(res => res.json())
        .then(res => {
        
          if (res.status) {
            setErr(false);
            console.log(res.data);
            localStorage.setItem('login', JSON.stringify(res))
            navigation.navigate("Home")
          } else {
            throw new Error
          }

        })
        .catch(err => {
          setErr(true)
        })

    }
  }



  return (

    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.heading_m}>ART POINT</Text>
      <Text style={styles.heading_s}>Distributer Login</Text>

      <View style={styles.subContainer}>
        <Image style={styles.icon} source={require("../assets/icons/user.png")} />
        <TextInput
          placeholder='User Email'
          style={styles.input}
          onChangeText={(value) => setUserName(value)} />
      </View>

      <View style={styles.subContainer}>
        <Image style={styles.icon} source={require("../assets/icons/key.png")} />
        <TextInput
          placeholder='Password'
          style={styles.input}
          onChangeText={(value) => setPassword(value)} />
      </View>

      <Text>
        {err ? <Text style={{ color: 'red' }}>Error</Text> : <Text style={{ color: 'red' }}></Text>}
      </Text>

      <View style={{ flexDirection:"row" }}>
          <View style={styles.buttonStyle}>

          <Pressable  android_ripple={{color: '#fff' }}  style={GStyle.button} onPress={() => { handleLogin() }} >
              <Text style={GStyle.button_text}>Login</Text>
          </Pressable>

          {/* <Button style={}  title='Login' /> */}
          </View>
          <View style={styles.buttonStyle}>

          <Pressable style={GStyle.button} onPress={() => { handleLogin() }} >
              <Text style={GStyle.button_text}>Catelog</Text>
          </Pressable>

          </View>
      </View>



    
    </KeyboardAvoidingView>
  

  );
}


const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 20,
    marginTop: 5,
    width: "30%"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },

  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#ebebeb",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginTop: 10

  },

  heading_m: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red"
  },
  heading_s: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey"
  },

  input: {
    height: 40,
    minWidth: 250,
    marginLeft: 10,

  },

  error: {
    color: "red",
    textAlign: "center",
    fontSize: 20
  },

  success: {
    color: "green",
    textAlign: "center",
    fontSize: 20
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 10
  }

});