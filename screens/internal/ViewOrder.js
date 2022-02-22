import { View, Text, Image, Dimensions, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { API } from '../../data';
import Marketeer from './Marketeer.js';


export default function ViewOrder({props, }) {

    const data = props.data
    const {navigation} = props

    const [sizeValue, setSizeValue] = useState({
        height: 10,
        width: 10
    })

    const [marketeer, setMarketeer] = useState("")

    const [pdtimage, setpdtImage] = useState("");

    useEffect(async ()=>
    {
        if (data.order_processed_by) {
            setMarketeer(data.order_processed_by)
        }else{
            setMarketeer("NO")
        }
        
        await fetch(`${API}/products/list/${data.product_id}`,{method: "post"})
        .then(res => res.json())
        .then(res => {
            setpdtImage(res.data.image);
          
        })

        return ()=>{
            setpdtImage("");
            setMarketeer("");
        }

     
    }, [])

    const cancelOrder = async ()=>{
        await fetch(`${API}/order/cancel`,{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({_id: data._id})
        })
        .then(res => res.json())
        .then(res => {
            
          if (res.status) {
              navigation.goBack()
          }
        })
    }
    

    const CancelButton = () =>{
        if (data.status == 0) {
            return(
                <View style={style.buttonContainer} >
                <Pressable
                onPress={()=>{cancelOrder()}}
                 android_ripple={true} 
                    style={({pressed})=>{
                        if (pressed) {return {...style.buttonView, backgroundColor: "#8B0000"}}
                        else {return style.buttonView}
                    }}>
                    <Text style={style.buttonText}>Cancel Order</Text>
                </Pressable>
            </View>
            )
        } else{
            return (<></>)
        }
    }
    
 
  return (
    <ScrollView  >
        <Image 
        style={{
                height: (sizeValue.height * (Dimensions.get("screen").width/sizeValue.width))-50,
                width:Dimensions.get("screen").width-50,
                margin: 25
              
            }} 
            source={{uri: pdtimage}} />
            <Marketeer id={marketeer} />

        <View style={style.calculatedValue}>
            <Text style={style.calculatedValueText}>
                Product Dimention
            </Text>
            <Text style={style.calculatedValueText}>
               {data.order_details.height} Inchs Height X {data.order_details.width} Inchs Width  
            </Text>
        </View>

        
            <View style={style.textLabelContainer}>
                <Text style={style.label}>Glass (MM)</Text>
                <Text style={style.labelData}>{data.order_details.glass} mm</Text>
            </View>
    


            <View style={style.textLabelContainer}>
                <Text style={style.label}>Height (Inch)</Text>
                <Text style={style.labelData}>{data.order_details.height} in</Text>
            </View>
   
            <View style={style.textLabelContainer}>
                <Text style={style.label}>Width  (Inch)</Text>
                <Text style={style.labelData}>{data.order_details.width} in</Text>
            </View>
     
            <View style={style.textLabelContainer}>
                <Text style={style.label}>Sandwitch Glass (MM)</Text>
                <Text style={style.labelData}>{data.order_details.sandwich} mm</Text>
            </View>
  
            <View style={style.textLabelContainer} >
                <Text style={style.label}>Order Quantity (Nos)</Text>
                <Text style={style.labelData}>{data.order_details.quantity} Nos</Text>
            </View>
       
            <View  style={style.textLabelContainer} >
                <Text style={style.label}>Want Arc?</Text>
                <Text style={style.labelData}>{data.order_details.arc? "Yes":"No"}</Text>
            </View>
            
            <View  style={style.textLabelContainer} >
                <Text style={style.label}>Varnish Coat</Text>  
                <Text style={style.labelData}>{data.order_details.varnish? "Yes":"No"}</Text>
            </View>

            <View  style={style.textLabelContainer} >
                <Text style={style.label}>White Coat</Text>
                <Text style={style.labelData}>{data.order_details.whiteCoat? "Yes":"No"}</Text>
            </View>
            

        <View style={style.switchCollectionContainer}>
            <Text style={style.title}>Image Position</Text>
            <View style={style.switchCollection}>
                <View style={style.switchContainer}>
                    <Text style={style.positionText}>Top</Text>
                    <Text>{data.order_details.position.top? "Yes":"No"}</Text>
                </View>

                <View style={style.switchContainer}>
                    <Text style={style.positionText}>Bottom</Text>
                     <Text>{data.order_details.position.bottom? "Yes":"No"}</Text>           
                </View>

                <View style={style.switchContainer}>
                    <Text style={style.positionText}>Left</Text>
                     <Text>{data.order_details.position.left? "Yes":"No"}</Text>
                </View>

                <View style={style.switchContainer}>
                    <Text style={style.positionText}>Right</Text>
                     <Text>{data.order_details.position.right? "Yes":"No"}</Text>
                </View>
            </View>
        </View>

        <View style={style.textContainer}>
            <Text>Shipping Address:  {data.shipping_address? data.shipping_address:"Nil"}</Text>
        </View>
        <View style={style.textContainer}>
            <Text>Custom Message: {data.message? data.message:"Nil"}</Text>
        </View>

        <CancelButton/>
        

    </ScrollView>
  )
}

const style = StyleSheet.create({
  
    textLabelContainer:{
        flexDirection: "row",
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 10,
        borderWidth: 1,
        padding: 5
    },
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
        width: "70%",
        
    },
    labelData : {
        width: "70%",
        fontWeight: "bold"
        
    },
    switch: {
        width: "60%",
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    switchCollectionContainer:{
        marginBottom: 20
    },

    switchCollection: {
        flexDirection: 'row'
    },

    switchContainer: {
        width: "25%",
        justifyContent: 'center',
        alignItems: 'center'
    },

    positionText:{
        fontWeight: "bold"
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
        marginBottom: 20,
    },
    calculatedValueText:{
       fontWeight: 'bold',
       color:"green",
       
    },


    text:{}
})