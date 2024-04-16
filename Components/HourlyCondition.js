import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import { weatherData } from "../constant";
import LottieView from "lottie-react-native";


import { UseAppContext } from "../context/AppContext";

function convertFormat(dateTimeString) {
  const [datePart, timePart] = dateTimeString.split(" ");
  const [hours, minutes] = timePart.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
}

const conditionKeys = {
  temperature: "temp_c",
  humidity: "humidity",
  wind: "wind_kph",
  uv: "uv",
};

const HourlyContentItem = ({ hour, condition, isKm }) => {
  // console.log(hour);
  const conditionText = hour?.condition?.text?.trim();
  const time = convertFormat(hour?.time);
  let value;

  if (condition === "temperature") {
    if (UseAppContext().iscelsius) {
      value = Math.round(hour["temp_c"]) + "°C";
    } else {
      value = Math.round(hour["temp_f"]) + "°F";
    }
  } else {
    value = Math.round(hour[conditionKeys[condition]]);
    if (condition === "wind") {
      if (isKm) {
        value += " km";
      } else {
        // Convert km/h to mph
        value = Math.round(value * 0.621371) + "mile";
      }
    } else if (condition === "humidity") {
      value += "%";
    }
  }

  return (
    <View style={styles.hourlyContent}>
      <Text style={styles.timeText}>{time}</Text>
      <LottieView
        style={[
          styles.forecastHourlyIcon,
          {
            transform:
              weatherData[conditionText]?.transform ||
              weatherData.other.transform,
          },
        ]}
        source={
          weatherData[conditionText]?.require || weatherData.other.require
        }
        speed={weatherData[conditionText]?.speed || weatherData.other.speed}
        autoPlay
      />
      <Text style={styles.conditionText}>{conditionText}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const ConditionButton = ({ text, onPress, isSelected }) => (
  <TouchableOpacity
    style={{ flexDirection: "row", alignItems: "center" }}
    onPress={onPress}
  >
    <Text style={[styles.conditionBtnText, isSelected && styles.selected]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const HourlyCondition = (data) => {
  const [condition, setCondition] = useState("temperature");
  const appContext = UseAppContext();
  const HourlyData = data?.data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/otherIcon/clock4.png")}
          style={styles.clockIcon}
        />
        <Text style={styles.headerText}>Hourly Forecast</Text>
      </View>
      <View style={styles.conditionBtnGroup}>
        {["temperature", "humidity", "wind", "uv"].map(
          (conditionBtn, index) => (
            <ConditionButton
              key={conditionBtn}
              text={conditionBtn}
              onPress={() => setCondition(conditionBtn)}
              isSelected={condition === conditionBtn}
            />
          )
        )}
      </View>
      <View style={[styles.hourlyContainer, styles.shadowProp]}>
        <ScrollView
          style={styles.scrollView}
          horizontal
          showsHorizontalScrollIndicator={true}
        >
          {HourlyData?.map((hour, index) => (
            <HourlyContentItem
              key={index}
              hour={hour}
              condition={condition}
              isKm={appContext.iskm}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HourlyCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    marginTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  headerText: {
    fontFamily: "MeriendaBold",
    fontSize: 16,
    marginLeft: 10,
    color: "#102426",
  },
  clockIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  conditionBtnGroup: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 5,
  },
  conditionBtnText: {
    fontFamily: "MeriendaBold",
    color: "#102426",
    fontSize: 17,
    marginHorizontal: 10,
  },
  selected: {
    color: "#fff",
    backgroundColor: "#84b3ba",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 6,
    marginRight: 2,
    marginLeft: 2,
    //active
  },
  hourlyContainer: {
    width: "100%",
    // backgroundColor: "#edfdff",
    borderRadius: 10,
    // borderTopLeftRadius: 20,
    // borderBottomRightRadius: 20,
    marginBottom: 10, // Adjusted margin
  },
  // shadowProp: {
  //   shadowColor: "gray",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 3,
  // },
  hourlyContent: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginLeft: 12,
    marginRight: 30,
    paddingVertical: 3,
    
  },
  timeText: {
    fontFamily: "MeriendaBold",
    color: "#102426",
  },
  forecastHourlyIcon: {
    width: 55,
    height: 55,
  },
  conditionText: {
    fontFamily: "MeriendaBold",
    fontSize: 13,
    opacity: 1,
    marginTop: -3,
    color: "#102426",
  },
  valueText: {
    fontFamily: "MeriendaBold",
    fontSize: 17,
    marginTop: -5,
    color: "#102426",
  },
  scrollView: {
    padding: 5,
  },
});