import { View, Text, Image, Dimensions, StyleSheet, ScrollView, Switch, Alert, TextInput, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker';
import {numbers} from "../../constant"
import localStorage from "@react-native-async-storage/async-storage"
import { API } from '../../data';


export default function Order({props}) {

    const data = props
    const [sizeValue, setSizeValue] = useState({
        height: 10,
        width: 10
    })

    const [h1, setH1] = useState(12);
    const [h2, setH2] = useState(0);

    const [w1, setW1] = useState(12);
    const [w2, setW2] = useState(0);

    const [glass, setGlass] = useState(4);
    const [sglass, setSGlass] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const [arc, setarc] = useState(false);

    const [varnish, setVarnish] = useState(false);
    const [whiteCoat, setWhiteCoat] = useState(false);
    const [imagePosition, setImagePosition] = useState({
        top: false,
        bottom: false,
        right: false,
        left: false
    })

    const [order, setOrder] = useState({
        product_id : data._id ,
        order_details  :{
            width : w1+(w2/10),
            height : h1+(h2/10),
            arc : arc,
            varnish : varnish,
            whiteCoat : whiteCoat,
            quantity: quantity,
            price: 0,
            sandwich : sglass,
            message : "",
            position: imagePosition,
        },
        order_placed_by : "",
        shipping_address : "",
        category:data.category,
        subCategory: data.subCategory
    })

    const [distributerId, setDistributerId] = useState("")


    useEffect(async ()=>
    {
        let distributerId = await localStorage.getItem("login")
        let distributer = (JSON.parse(distributerId)).data._id
        setDistributerId(distributer)
        Image.getSize(
            data.image, 
            (width,height)=>{ setSizeValue({height, width})})
    }, [])
    
    useEffect(async ()=>
    {
        setOrder({
            product_id : data._id ,
            order_details  :{
                width : w1+(w2/10),
                height : h1+(h2/10),
                arc : arc,
                varnish : varnish,
                whiteCoat : whiteCoat,
                quantity: quantity,
                price: 0,
                sandwich : sglass,
                message : "",
                position: {
                    top: imagePosition.top,
                    botton: imagePosition.bottom,
                    right: imagePosition.right,
                    left: imagePosition.left
    
                },
            },
            order_placed_by : distributerId,
            shipping_address : "",
            category:data.category,
            subCategory: data.subCategory
        })
    }, [h1, h2, w1, w2, glass, sglass,quantity,arc,varnish,whiteCoat,imagePosition])

    const handlePlaceOrder = async ()=>{

        await fetch(`${API}/order/place`,{
            method: "post",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(res => {


            if (res.status) {
                Alert.alert("Order Placed Successfully")
            }else {
                Alert.alert("Order Failed")
            }
        })
    }


  return (
    <ScrollView  >
        <Image style={{height: sizeValue.height * (Dimensions.get("screen").width/sizeValue.width), width:Dimensions.get("screen").width}} source={{uri: data.image}} />
        <Text style={style.title}>Place Order</Text>

        

        <View style={style.dropdownContainers}>
            <View style={style.labelContainer}>
                <Text style={style.label}>Glass (MM)</Text>
            </View>
            <View style={style.drop1}>
                <Picker style={{color: "#ffffff"}} selectedValue={glass} onValueChange={(itemValue, itemIndex) => setGlass(itemValue)}>
                    <Picker.Item  label={`4mm`} value={4} />
                    <Picker.Item  label={`6mm`} value={6} />
                    <Picker.Item  label={`8mm`} value={8} />
                    <Picker.Item  label={`10mm`} value={10} />
                </Picker>
            </View>

        </View>

        <View style={style.dropdownContainers}>
            <View style={style.labelContainer}>
                <Text style={style.label}>Height (Inch)</Text>
            </View>
            <View style={style.drop1}>
                <Picker style={{color: "#ffffff"}} selectedValue={h1} onValueChange={(itemValue, itemIndex) => setH1(itemValue)}>
                    {numbers.map((num, i)=>{return <Picker.Item key={i} label={`${num.label} In`} value={num.value} />})}
                </Picker>
            </View>

            <View style={style.drop11}>
            <Picker selectedValue={h2} onValueChange={(itemValue, itemIndex) => setH2(itemValue) } >
                <Picker.Item label={`0`} value={0} />
                <Picker.Item label={`0.1`} value={0.1} />
                <Picker.Item label={`0.2`} value={0.2} />
                <Picker.Item label={`0.3`} value={0.3} />
                <Picker.Item label={`0.4`} value={0.4} />
                <Picker.Item label={`0.5`} value={0.5} />
                <Picker.Item label={`0.6`} value={0.6} />
                <Picker.Item label={`0.7`} value={0.7} />
                <Picker.Item label={`0.8`} value={0.8} />
                <Picker.Item label={`0.9`} value={0.9} />
            </Picker>
            </View>
        </View>

        <View style={style.dropdownContainers}>
            <View style={style.labelContainer}>
                <Text style={style.label}>Width  (Inch)</Text>
            </View>
            <View style={style.drop1}>
                <Picker style={{color: "#ffffff"}} selectedValue={w1} onValueChange={(itemValue, itemIndex) => setW1(itemValue)}>
                    {numbers.map((num, i)=>{return <Picker.Item key={i} label={`${num.label} In`} value={num.value} />})}
                </Picker>
            </View>

            <View style={style.drop11}>
            <Picker selectedValue={w2} onValueChange={(itemValue, itemIndex) => setW2(itemValue) } >
            <Picker.Item label={`0`} value={0} />
                <Picker.Item label={`0.1`} value={0.1} />
                <Picker.Item label={`0.2`} value={0.2} />
                <Picker.Item label={`0.3`} value={0.3} />
                <Picker.Item label={`0.4`} value={0.4} />
                <Picker.Item label={`0.5`} value={0.5} />
                <Picker.Item label={`0.6`} value={0.6} />
                <Picker.Item label={`0.7`} value={0.7} />
                <Picker.Item label={`0.8`} value={0.8} />
                <Picker.Item label={`0.9`} value={0.9} />
            </Picker>
            </View>
        </View>
        

        <View style={style.dropdownContainers}>
            <View style={style.labelContainer}>
                <Text style={style.label}>Sandwitch Glass (MM)</Text>
            </View>
            <View style={style.drop1}>
                <Picker style={{color: "#ffffff"}} selectedValue={sglass} onValueChange={(itemValue, itemIndex) => setSGlass(itemValue)}>
                    <Picker.Item  label={`0mm`} value={0} />
                    <Picker.Item  label={`4mm`} value={4} />
                    <Picker.Item  label={`6mm`} value={6} />
                    <Picker.Item  label={`8mm`} value={8} />
                    <Picker.Item  label={`10mm`} value={10} />
                </Picker>
            </View>
        </View>
        
        <View style={style.dropdownContainers}>
        
            
            <View style={style.labelContainer} >
                <Text style={style.label}>Order Quantity (Nos)</Text>
            </View>
            <View style={style.drop1}>
                <Picker style={{color: "#ffffff"}} 
                        selectedValue={quantity} 
                        onValueChange={(itemValue, itemIndex) => setQuantity(itemValue)} >
                <Picker.Item label={`1`} value={1} />
                <Picker.Item label={`2`} value={2} />
                <Picker.Item label={`3`} value={3} />
                <Picker.Item label={`4`} value={4} />
                <Picker.Item label={`5`} value={5} />
                {numbers.map((num, i)=>{return <Picker.Item key={i} label={`${num.label}`} value={num.value} />})}
                </Picker>
            </View>
        </View>

        <View style={style.dropdownContainers}>
            <View  style={style.labelContainer} >
                <Text style={style.label}>Want Arc?</Text>
            </View>
            
            <View style={style.switch}>
               <Switch value={arc} onValueChange={()=>{setarc(!arc)}}/>
            </View>
        </View>

        <View style={style.dropdownContainers}>
            <View  style={style.labelContainer} >
                <Text style={style.label}>Varnish Coat</Text>  
            </View>
            
            <View style={style.switch}>
               <Switch value={varnish} onValueChange={()=>{setVarnish(!varnish)}}/>
            </View>
        </View>

        <View style={style.dropdownContainers}>

            <View  style={style.labelContainer} >
                <Text style={style.label}>White Coat</Text>
            </View>
            
            <View style={style.switch}>
               <Switch value={whiteCoat} onValueChange={()=>{setWhiteCoat(!whiteCoat)}}/>
            </View>
        </View>

        <View style={style.switchCollectionContainer}>
            <Text style={style.title}>Image Position</Text>
            <View style={style.switchCollection}>
                <View style={style.switchContainer}>
                    <Text>Top</Text>
                    <Switch value={imagePosition.top} onValueChange={()=>{setImagePosition({...imagePosition, top:!imagePosition.top})}}/>
                </View>

                <View style={style.switchContainer}>
                    <Text>Bottom</Text>
                    <Switch value={imagePosition.bottom} onValueChange={()=>{setImagePosition({...imagePosition, bottom:!imagePosition.bottom})}}/>
                </View>

                <View style={style.switchContainer}>
                    <Text>Left</Text>
                    <Switch value={imagePosition.left} onValueChange={()=>{setImagePosition({...imagePosition, left:!imagePosition.left})}}/>
                </View>

                <View style={style.switchContainer}>
                    <Text>Right</Text>
                    <Switch value={imagePosition.right} onValueChange={()=>{setImagePosition({...imagePosition, right:!imagePosition.right})}}/>
                </View>
            </View>
        </View>

        <View style={style.textContainer}>
            <TextInput 
                value={order.shipping_address} 
                style={style.text} placeholder='Shipping Address'
                onChangeText={(value)=>{
                    setOrder({...order, shipping_address: value})
                }}
            />
        </View>

        <View style={style.textContainer}>
            <TextInput 
                value={order.message} 
                style={style.text} placeholder='Custom Message'
                onChangeText={(value)=>{
                    setOrder({...order, message: value})
                }}
            />
        </View>

        <View style={style.calculatedValue}>
            <Text style={style.calculatedValueText}>
                Product Dimention
            </Text>
            <Text style={style.calculatedValueText}>
               {(h1+(h2/10))} Inchs Height X {(w1+(w2/10))} Inchs Width  
            </Text>
        </View>

        <View style={style.buttonContainer} >
            <Pressable android_ripple={true} 
            onPress={()=>{handlePlaceOrder()}}
                style={({pressed})=>{
                    if (pressed) {return {...style.buttonView, backgroundColor: "#8B0000"}}
                    else {return style.buttonView}
                }}>
                <Image style={style.buttonIcon} source={require("../../assets/icons/bag.png")} />
                <Text style={style.buttonText}>Place Order</Text>
            </Pressable>
        </View>

    </ScrollView>
  )
}

const style = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 30,
        marginBottom: 20,
        marginTop: 10
    },
    dropdownContainers : {
        flexDirection: "row",
        borderBottomColor: "red",
        borderBottomWidth: 1,
        width: "95%",
        marginLeft: "2.5%",
        marginBottom: 10,
        paddingBottom: 5
    },

    drop1: {
        width: "33%",
        backgroundColor: "red",
        marginRight: 5
    },
    drop11: {
        width: "26%",
        backgroundColor: "#c9c9c9"
    },

    labelContainer:{
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    label : {

        
    },
    switch: {
        width: "60%",
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    switchCollectionContainer:{
        
    },

    switchCollection: {
        flexDirection: 'row'
    },

    switchContainer: {
        width: "25%",
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonContainer:{
        marginBottom:10,
        width: "95%",
        marginLeft: "2.5%",
        justifyContent:"center",
        alignItems:"center",
    },
    buttonView:{
        width: "70%",
        backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",
        height: 30,
        flexDirection: 'row'
    },
    buttonText:{
        color: "#fff"
    },

    buttonIcon:{
        width: 20,
        height:20,
        marginRight: 5,
        tintColor: "#fff"
    },

    textContainer:{
        width: "95%",
        marginLeft: "2.5%",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 10
    },

    calculatedValue:{
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 10,
    },
    calculatedValueText:{
       fontWeight: 'bold',
       color:"green"
    },


    text:{}
})