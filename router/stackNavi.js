import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation"
import SpecificOrders from "../screens/internal/SpecificOrders"

import { View, Text,Button } from "react-native"


const main = ({navigation}) =>{
    return (
        <View>
          <Text>Orders</Text>
          <Button onPress={
              ()=>{navigation.navigate("SpecificOrders", {itemId: 86})
          }} title="specific order"/>
          <Button onPress={
              ()=>{navigation.navigate("SpecificOrders", {itemId: 87})
          }} title="specific order"/>
        </View>
      )
}

const screens = {
    Main: main,
    SpecificOrders: SpecificOrders
}

const OrderStackNavi = createStackNavigator(screens)
export let OrderNavigation = createAppContainer(OrderStackNavi);