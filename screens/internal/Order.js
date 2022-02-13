import { View, Text, Image, Dimensions, StyleSheet, ScrollView, Switch } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker';
import {numbers} from "../../constant"


export default function Order({props}) {

    const data = props
    const [sizeValue, setSizeValue] = useState({
        height: 10,
        width: 10
    })

    const [h1, setH1] = useState();
    const [h2, setH2] = useState();

    const [w1, setW1] = useState();
    const [w2, setW2] = useState();

    const [glass, setGlass] = useState();
    const [sglass, setSGlass] = useState();

    const [arc, setarc] = useState(false);


    useEffect(()=>{
        Image.getSize(data.image, (width,height)=>{
            // const ratio = win.width/w; //541 is actual image width
            // const height = h * ratio
            setSizeValue({
               height, width
            })
         })

    },[])


  return (
    <ScrollView>
        <Image style={{height: sizeValue.height * (Dimensions.get("screen").width/sizeValue.width), width:Dimensions.get("screen").width}} source={{uri: data.image}} />
        <Text style={style.title}>Place Order</Text>

        

        <View style={style.dropdownContainers}>
            <Text style={style.label}>Glass (MM)</Text>
            <View style={style.drop1}>
                <Picker selectedValue={glass} onValueChange={(itemValue, itemIndex) => setGlass(itemValue)}>
                    <Picker.Item  label={`0mm`} value={0} />
                    <Picker.Item  label={`4mm`} value={4} />
                    <Picker.Item  label={`6mm`} value={6} />
                    <Picker.Item  label={`8mm`} value={8} />
                    <Picker.Item  label={`10mm`} value={10} />
                </Picker>
            </View>

        </View>

        <View style={style.dropdownContainers}>
            <Text style={style.label}>Height (Inch)</Text>
            <View style={style.drop1}>
                <Picker selectedValue={h1} onValueChange={(itemValue, itemIndex) => setH1(itemValue)}>
                    {numbers.map((num, i)=>{return <Picker.Item key={i} label={`${num.label} In`} value={num.value} />})}
                </Picker>
            </View>

            <View style={style.drop11}>
            <Picker selectedValue={h2} onValueChange={(itemValue, itemIndex) => setH2(itemValue) } >
            <Picker.Item label={`0`} value={0} />
                {numbers.map((num, i)=>{return <Picker.Item key={i} label={`${num.label}`} value={num.value} />})}
            </Picker>
            </View>
        </View>

        <View style={style.dropdownContainers}>
            <Text style={style.label}>Width  (Inch)</Text>
            <View style={style.drop1}>
                <Picker selectedValue={w1} onValueChange={(itemValue, itemIndex) => setW1(itemValue)}>
                    {numbers.map((num, i)=>{return <Picker.Item key={i} label={`${num.label} In`} value={num.value} />})}
                </Picker>
            </View>

            <View style={style.drop11}>
            <Picker selectedValue={w2} onValueChange={(itemValue, itemIndex) => setW2(itemValue) } >
            <Picker.Item label={`0`} value={0} />
                {numbers.map((num, i)=>{return <Picker.Item key={i} label={`${num.label}`} value={num.value} />})}
            </Picker>
            </View>
        </View>

        <View style={style.dropdownContainers}>
            <Text style={style.label}>Sandwitch Glass (MM)</Text>
            <View style={style.drop1}>
                <Picker selectedValue={sglass} onValueChange={(itemValue, itemIndex) => setSGlass(itemValue)}>
                    <Picker.Item  label={`0mm`} value={0} />
                    <Picker.Item  label={`4mm`} value={4} />
                    <Picker.Item  label={`6mm`} value={6} />
                    <Picker.Item  label={`8mm`} value={8} />
                    <Picker.Item  label={`10mm`} value={10} />
                </Picker>
            </View>
        </View>
        
        <View style={style.dropdownContainers}>
            <Text style={style.label}>Order Quantity (Nos)</Text>
            <View style={style.drop1}>
                <Picker selectedValue={sglass} onValueChange={(itemValue, itemIndex) => setSGlass(itemValue)}>
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
            <Text style={style.label}>Want Arc?</Text>
            <View style={style.drop1}>
               <Switch value={arc} onValueChange={()=>{setarc(!arc)}}/>
            </View>
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
        backgroundColor: "grey",
        marginRight: 5
    },
    drop11: {
        width: "25%",
        backgroundColor: "#c9c9c9"
    },
    label : {
        width: "40%",
        padding: "5%"
    }
})