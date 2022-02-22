import React from 'react';
import { StatusBar, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import localStorage from "@react-native-async-storage/async-storage"
import Login from "../components/Login"
import Home from "../screens/Home"
import Orders from '../screens/Orders';
import Favorites from '../screens/Favorites';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

export default function App() {




  return (
    <NavigationContainer>
     <StatusBar backgroundColor="red" barStyle="light-content" />
      <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarStyle: route.name === 'Login'? {display: "none"} : null,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
        
        })}> 

        <Tab.Screen name="Login" component={Login} options={{
            tabBarItemStyle:{
                display: "none"
            },
            headerShown: false
        }} />

        <Tab.Screen name="Home" component={Home} options={{
            headerShown: false,
            tabBarIcon : ({focused})=>{
              return <Image style={{...style.tabBarIcons , tintColor: focused? "red": "grey"}} source={require("../assets/icons/home.png")} />
            }
        }} />

        <Tab.Screen name="Orders" component={Orders} options={{
            headerShown: false,
            tabBarIcon : ({focused})=>{
              return <Image style={{...style.tabBarIcons , tintColor: focused? "red": "grey"}} source={require("../assets/icons/bag.png")} />
            }
        }} />

        <Tab.Screen name="Favorites" component={Favorites} options={{
            headerShown: false,
            tabBarIcon : ({focused})=>{
              return <Image style={{...style.tabBarIcons , tintColor: focused? "red": "grey"}} source={require("../assets/icons/heart.png")} />
            }
        }} />

        <Tab.Screen name="Settings" component={Settings} options={{
            // headerShown: false,
            headerTitleAlign: "center",
            tabBarIcon : ({focused})=>{
              return <Image style={{...style.tabBarIcons , tintColor: focused? "red": "grey"}} source={require("../assets/icons/gear.png")} />
            }
        }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}


const style = StyleSheet.create({
  tabBarIcons: {
    width: 20,
    height: 20
  }
})