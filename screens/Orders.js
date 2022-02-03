import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, Dimensions, Button, Platform } from "react-native";
import localStorage from "@react-native-async-storage/async-storage"
import { API } from "../data";
import GetMarketeer from "../components/GetMarketeer";

export default function Orders() {
  const [items, setItems] = useState([]);

  const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {
    getOrder();
  }, [refresh]);

  const getOrder = async () => {
    const datum = await localStorage.getItem("login");
    const datas = JSON.parse(datum );

    await fetch(`${API}/distributer/my_orders`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: datas.data._id }),
    })
      .then((response) => response.json())
      .then((json) => {
          // console.log(json.data);
        setItems([...json.data]);
      })
      .catch((err)=>{ console.log(err); })
      ;
  };



  return (
    <ScrollView
    onScrollBeginDrag={()=>setRefresh(!refresh)}
      style={{
        display: "flex",
        flex: 1,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
    >
      <Button onPress={()=>{setRefresh(!refresh)}} title="refresh" />
      <View style={styles.heightDivider}></View>
      {items ? (
        <>
          {items.map((val) => {
            return (
              <View style={styles.container} key={val._id}>
                <Text style={styles.title}>Order Details:</Text>
                <Text style={styles.title}>{val.product_id}</Text>
                <View style={styles.container2}>
                  <View style={styles.container3}>
                    <Text style={styles.text}>✅ Width: {val.order_details.width} Inches </Text>
                    <Text style={styles.text}>✅ Height: {val.order_details.height} Inches </Text>
                    {val.order_details.arcTop ? ( <Text style={styles.text}>✅ Arc Top </Text>  ) : null}
                    {val.order_details.arcBottom ? ( <Text style={styles.text}>✅ Arc Bottom </Text> ) : null}
                    {val.order_details.sandwich ? ( <Text style={styles.text}>✅ Sandwitch </Text>  ) : null}
                    {val.order_details.whiteCoat ? ( <Text style={styles.text}>✅ WhiteCoat </Text> ) : null}
                    {val.order_details.varnish ? ( <Text style={styles.text}>✅ Varnish </Text> ) : null}
                  </View>
                </View>
                <View >
                  <View style={{flexDirection:'row', padding: 10}}>
                    <Text style={styles.text2} >Status: </Text>
                    {val.status === 0 ? ( <Text style={styles.text}>Not Assigned </Text> ) : null}
                    {val.status === 1 ? ( <Text style={styles.text}>Assigned </Text> ) : null}
                    {val.status === 2 ? ( <Text style={styles.text}>Confirmed </Text>  ) : null}
                    {val.status === 3 ? ( <Text style={styles.text}>First Pay (</Text>  ) : null}
                    {val.status === 4 ? ( <Text style={styles.text}>Printing </Text> ) : null}
                    {val.status === 5 ? ( <Text style={styles.text}>Second Pay </Text> ) : null}
                    {val.status === 6 ? ( <Text style={styles.text}>Completed </Text> ) : null}
                    
                  </View>
                  <View style={styles.loadWarp}>
                  <View style={{...styles.loadBar,width:(`${val.status/6*100}%`),}}>

                    <Text style={{textAlign:"center", color: "white"}}>
                    {val.status === 0 ? ('(0/6)') : null}
                    {val.status === 1 ? ('(1/6)') : null}
                    {val.status === 2 ? ('(2/6)') : null}
                    {val.status === 3 ? ('(3/6)') : null}
                    {val.status === 4 ? ('(4/6)') : null}
                    {val.status === 5 ? ('(5/6)') : null}
                    {val.status === 6 ? ('(6/6)') : null}
                    </Text>
                    
                  </View>
                  </View>
                  <View  style={{padding:10}}>
                    <Text style={styles.text}>Marketeer:</Text>

                   <GetMarketeer  id={val.order_processed_by} />

                  </View>
                </View>

                
              </View>
              
            );
          })}
        </>
      ) : (
        <Text style={styles.text}>No Orders Yet</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  loadWarp:{
    padding: 5,
    backgroundColor: "grey",
    width: "90%",
    elevation: 10,
    borderRadius: 15,
    margin: 10

  },
  loadBar:{
    flex:1,

    height: 20,
    backgroundColor: "#91C483",
    borderRadius: 10,
    
  },
  input: {
    width: Dimensions.get("window").width - 50,
    fontSize: 15,
    borderBottomWidth: 2,
    marginTop: 15,
    marginLeft: 10,
    paddingTop: 15,
    borderBottomColor: "red",
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    color: "red",
    fontWeight: "bold"
  },
  text: {
      fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
    flexDirection: "column",
    width: Dimensions.get("screen").width
  },
  text2: {
      flexDirection:"row",
    fontSize: 14,
    marginTop: 5,
    flexDirection: "column",
  
  },
  heightDivider: {
    height: 50,
  },
  container: {
    padding: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    borderRadius: 10,
    elevation:1,
    shadowColor: "black",
    padding: 10,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: Platform.OS ==="ios"? "black": null,
    borderWidth: Platform.OS ==="ios"? 5: null,



  },
  container2: {
    borderBottomWidth: 1,
    padding: 5,
    margin: 10,
  },
  container3: {
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
  logout: {
    marginBottom: 10,
  },
});