import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation"
import SpecificOrders from "../screens/orders/SpecificOrders"
import { View, Text,Button } from "react-native"
import PDTcategory from "../screens/products/PDTcategory"
import PDT from "../screens/products/PDT"
import ViewProduct from "../screens/products/ViewProduct"
import OrderProduct from "../screens/products/OrderProduct"
import Trending from "../screens/internal/Trending"
import Order from "../screens/orders/Order"
import Favorites from "../screens/Favorites/Favorites"


const order_screens = {
    "Orders": Order,
    "Order Details": SpecificOrders
}


const product_screens = {
    Home: {
        screen:PDTcategory,
        
    },
    Products: PDT,
    ViewProduct: ViewProduct,
    Order: OrderProduct,
    Trending: Trending
}

const fav_screens = {
    "Fav": Favorites,
    Order: OrderProduct,
}


const OrderStackNavi = createStackNavigator(order_screens)
export let OrderNavigation = createAppContainer(OrderStackNavi);

const PDTStackNavi = createStackNavigator(product_screens)
export let PDTNavigation = createAppContainer(PDTStackNavi);

const FAVStackNavi = createStackNavigator(fav_screens)
export let FAVNavigation = createAppContainer(FAVStackNavi);