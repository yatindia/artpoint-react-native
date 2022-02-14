import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation"
import SpecificOrders from "../screens/internal/SpecificOrders"
import { View, Text,Button } from "react-native"
import PDTcategory from "../screens/products/PDTcategory"
import PDT from "../screens/products/PDT"
import ViewProduct from "../screens/products/ViewProduct"
import OrderProduct from "../screens/products/OrderProduct"
import Trending from "../screens/internal/Trending"

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

const order_screens = {
    Main: main,
    SpecificOrders: SpecificOrders
}


const product_screens = {
    Home: PDTcategory,
    Products: PDT,
    ViewProduct: ViewProduct,
    Order: OrderProduct,
    Trending: Trending
        
    
}

const OrderStackNavi = createStackNavigator(order_screens)
export let OrderNavigation = createAppContainer(OrderStackNavi);

const PDTStackNavi = createStackNavigator(product_screens)
export let PDTNavigation = createAppContainer(PDTStackNavi);