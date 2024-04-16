import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import HourlyCondition from "../Components/HourlyCondition";
import Chance from "../Components/Chance";
import { weatherData } from "../constant";
import LottieView from "lottie-react-native";
import { UseAppContext } from "../context/AppContext";

const NextDayScreen = ({ route }) => {
  // console.log(route?.params);
  const appContext = UseAppContext();
  const navigate = useNavigation();
  const dayData = route?.params;


  const dayName = new Date(dayData?.date)?.toLocaleDateString("en-US", {
    weekday: "long",
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);

    return `${day} ${month}, ${dayOfWeek}`;
  }

  const conditionText = route?.params?.day?.condition?.text?.trim();
  const maxTemperature_c = route?.params?.day?.maxtemp_c;
  const maxTemperature_f = route?.params?.day?.maxtemp_f;
  const minTemperature_c = route?.params?.day?.mintemp_c;
  const minTemperature_f = route?.params?.day?.mintemp_f;
  const avghumidity = route?.params?.day?.avghumidity;
  const avgAirKm = route?.params?.day?.avgvis_km;
  const sunRise = route?.params?.astro?.sunrise;
  const sunset = route?.params?.astro?.sunset;

  return (
    <View>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={"transparent"}
      />
      <ImageBackground
        blurRadius={50}
        source={require("../assets/background/bg.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView>
          <SafeAreaView>
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() => navigate.goBack()}
                style={{ ...styles.backBtn, ...styles.shadowProp }}
              >
                <ChevronLeftIcon size={30} strokeWidth={2.5} color="#102426" />
              </TouchableOpacity>
              <Text style={styles.dayName}>{dayName}</Text>
            </View>
          </SafeAreaView>

          <View style={styles.conditionContainer}>
            <View style={styles.temperatureCondition}>
              <LottieView
                style={[
                  styles.forecastdayIcon,
                  {
                    transform: weatherData[conditionText]?.transform,
                  },
                ]}
                source={weatherData[conditionText]?.require}
                speed={weatherData[conditionText]?.speed}
                autoPlay
              />

              <View style={styles.temperatureContent}>
                <View>
                  <Text
                    style={{ fontFamily: "MeriendaBold", ...styles.dateDay }}
                  >
                    {formatDate(dayData?.date)}
                  </Text>
                </View>
                <View style={styles.temperature}>
                  <Text style={styles.maxTemperature}>
                    {appContext.iscelsius
                      ? `${Math.round(maxTemperature_c)}°C`
                      : `${Math.round(maxTemperature_f)}°F`}
                  </Text>
                  <Text style={styles.slash}>/</Text>
                  <Text style={styles.minTemperature}>
                    {appContext.iscelsius
                      ? `${Math.round(minTemperature_c)}°C`
                      : `${Math.round(minTemperature_f)}°F`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ ...styles.headerBottomContainer, marginTop: 10 }}>
              <View
                style={{ ...styles.himidity, marginRight: 15, marginLeft: -3 }}
              >
                <View
                  style={{
                    ...styles.iconImageBC,
                    ...styles.shadowPropImgBC,
                  }}
                >
                  <Image
                    style={styles.himidityImage}
                    source={require("../assets/otherIcon/air.png")}
                  />
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontFamily: "MeriendaBold",
                      fontSize: 16,
                      marginBottom: -3,
                      opacity: 0.7,
                      color: "#102426",
                    }}
                  >
                    wind speed
                  </Text>
                  <Text
                    style={{
                      fontFamily: "MeriendaBold",
                      fontSize: 17,
                      marginTop: -2,
                      color: "#102426",
                    }}
                  >
                    {/* {avgAirKm}km */}
                    {appContext.iskm
                      ? avgAirKm + "km"
                      : Math.round(avgAirKm * 0.621371) + "mile"}
                  </Text>
                </View>
              </View>

              <View style={styles.himidity}>
                <View
                  style={{
                    ...styles.iconImageBC,
                    ...styles.shadowPropImgBC,
                  }}
                >
                  <Image
                    style={styles.himidityImage}
                    source={require("../assets/otherIcon/humidity1.png")}
                  />
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontFamily: "MeriendaBold",
                      fontSize: 16,
                      marginBottom: -3,
                      opacity: 0.7,
                      color: "#102426",
                    }}
                  >
                    humidity
                  </Text>
                  <Text
                    style={{
                      fontFamily: "MeriendaBold",
                      fontSize: 17,
                      marginTop: -2,
                      color: "#102426",
                    }}
                  >
                    {avghumidity}%
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                ...styles.headerBottomContainer,
                marginTop: 20,
                marginBottom: 15,
              }}
            >
              <View
                style={{ ...styles.himidity, marginRight: 15, marginLeft: -3 }}
              >
                <View
                  style={{
                    ...styles.iconImageBC,
                    ...styles.shadowPropImgBC,
                  }}
                >
                  <Image
                    style={styles.himidityImage}
                    source={require("../assets/otherIcon/sunRise2.png")}
                  />
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontFamily: "MeriendaBold",
                      fontSize: 16,
                      marginBottom: -3,
                      opacity: 0.7,
                      color: "#102426",
                    }}
                  >
                    sunrise
                  </Text>
                  <Text
                    style={{
                      fontFamily: "MeriendaBold",
                      fontSize: 16,
                      marginTop: -2,
                      color: "#102426",
                    }}
                  >
                    {sunRise}
                  </Text>
                </View>
              </View>

              <View style={styles.himidity}>
                <View
                  style={{
                    ...styles.iconImageBC,
                    ...styles.shadowPropImgBC,
                    marginTop: 7,
                  }}
                >
                  <Image
                    style={styles.himidityImage}
                    source={require("../assets/otherIcon/sunSet1.png")}
                  />
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontFamily: "MeriendaBold",
                      fontSize: 16,
                      marginBottom: -3,
                      opacity: 0.7,
                      color: "#102426",
                    }}
                  >
                    sunset
                  </Text>
                  <Text
                    style={{
                      fontFamily: "MeriendaBold",
                      fontSize: 16,
                      marginTop: -2,
                      color: "#102426",
                    }}
                  >
                    {sunset}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <HourlyCondition data={dayData?.hour} />

          <View style={{marginBottom: 30}}>
            <Chance data={dayData?.hour} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default NextDayScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  headerView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginTop: 3,
  },
  backBtn: {
    borderRadius: 20,
    padding: 8,
    backgroundColor: "#edfdff",
    width: 50,
    marginLeft: 10,
    position: "relative",
    zIndex: 3,
  },
  shadowProp: {
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayName: {
    flex: 1,
    fontSize: 25,
    marginTop: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: "#002f34",
    zIndex: 0,
    position: "absolute",
    width: "100%",
  },
  conditionContainer: {
    backgroundColor: "#e4fcff66",
    marginHorizontal: 7,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  temperatureCondition: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 6,
    marginTop: 6,
  },
  forecastdayIcon: {
    height: 105,
    width: 105,
  },
  temperatureContent: {},
  dateDay: {
    fontSize: 15,
    marginTop: 10,
    color: "#102426",
  },
  temperature: {
    flexDirection: "row",
    alignItems: "center",
  },
  maxTemperature: {
    fontSize: 43,
    fontWeight: "bold",
    color: "#102426",
  },
  slash: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: -10,
    marginHorizontal: 4,
    color: "#102426",
  },
  minTemperature: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: -15,
    color: "#102426",
  },
  headerBottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 20,
  },
  himidity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  himidityImage: {
    width: 25,
    height: 25,
  },
  iconImageBC: {
    width: 37,
    height: 37,
    borderRadius: 50,
    backgroundColor: "#edfdff",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  shadowPropImgBC: {
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
});