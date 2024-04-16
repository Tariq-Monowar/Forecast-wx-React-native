import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ToastAndroid,
    Image,
  } from "react-native";
  import React, { useContext, useState } from "react";
  import { AppContext } from "../context/AppContext";
  import { storageData } from "../util/asyncstorage";
  import { useNavigation } from "@react-navigation/native";
  
  const DrowerList = () => {
    const navigation = useNavigation()
    const appContext = useContext(AppContext);

    const showToast = (message) => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    };
  
    const chnageTemperatureUnit = async () => {
      appContext.setIscelsius(!appContext.iscelsius);
      let unit = !appContext.iscelsius;
      showToast(
        unit ? "You are in Fahrenheit scale" : "You are in celsius scale"
      );
      await storageData("temperature", unit.toString());
    };
    const changeWindSpeed = async () => {
      appContext.setIskm(!appContext.iskm);
      let distance = !appContext.iskm;
      showToast(
        appContext.iskm ? "You are in miles scale" : "You are in kilometer scale"
      );
      await storageData("distance", distance.toString());
    };
  
    return (
      <View style={styles.drowerListContainer}>
        <TouchableOpacity
          onPress={chnageTemperatureUnit}
          style={[styles.drowerListContant, styles.shadowProp]}
        >
          <Text style={{ fontFamily: "MeriendaBold", ...styles.itemTetx }}>
            temperature unit
          </Text>
          <Text style={{ fontFamily: "MeriendaBold", ...styles.itemUnit }}>
            &#176;{appContext.iscelsius ? "C" : "F"}
          </Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={changeWindSpeed}
          style={[styles.drowerListContant, styles.shadowProp]}
        >
          <Text style={{ fontFamily: "MeriendaBold", ...styles.itemTetx }}>
            wind speed
          </Text>
          <Text style={{ fontFamily: "MeriendaBold", ...styles.itemUnit }}>
            {appContext.iskm ? "km" : "miles"}
          </Text>
        </TouchableOpacity>
  
        <TouchableOpacity  onPress={() => navigation.navigate('message')} style={[styles.drowerListContant, styles.shadowProp]}>
          <Text
            style={{
              fontFamily: "MeriendaBold",
              ...styles.itemTetx,
              marginBottom: 2,
            }}
          >
            instructions
          </Text>
          <Image
            style={{ marginRight: -5, width: 30, height: 30, marginTop: 3 }}
            source={require("../assets/otherIcon/Announcement3.png")}
          />
        </TouchableOpacity>
      </View>
    );
  };
  
  export default DrowerList;
  
  const styles = StyleSheet.create({
    drowerListContainer: {},
    drowerListContant: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      // borderWidth: 1,
      // borderColor: '#3e6469de',
      backgroundColor: "#d0f1f7",
      borderRadius: 5,
      paddingTop: 4,
      paddingBottom: 7,
      paddingLeft: 10,
      paddingRight: 15,
      marginHorizontal: 7,
      marginBottom: 10,
    },
    shadowProp: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 1.84,
      elevation: 1.5,
    },
    itemTetx: {
      fontSize: 19,
      color: "#102426",
    },
    itemUnit: {
      fontSize: 20,
      color: "#102426",
    },
  });