// Importing necessary modules from React Native and other libraries
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { debounce } from "lodash";
import { Bars3BottomLeftIcon } from "react-native-heroicons/outline";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

// Importing context and constant data
import { UseAppContext } from "../context/AppContext";
import { weatherData } from "../constant";
import HourlyCondition from "../Components/HourlyCondition";
// import HourlyCondition from "./../Components/HourlyCondition";

const HomeScreens = () => {
  const navigation = useNavigation();
  const appContext = UseAppContext();
  const [shouldShowSuggestion, setShouldShowSuggestion] = useState(false);
  const [openSearchValue, setOpenSearchValue] = useState("");

  // Effect to handle font loading


  // useEffect(() => {
  //   setTimeout(() => {
  //     setShouldShowSuggestion(false)
  //   }, 23000);
  // }, [shouldShowSuggestion])

  // Function to open drawer
  const openDrawer = () => {
    navigation.openDrawer();
    setShouldShowSuggestion(false);
  };

  // Function to handle search input
  const handleSearch = async (e) => {
    if (e.length >= 1) {
      appContext.setFindLication(e);
      setShouldShowSuggestion(true);
    } else {
      setShouldShowSuggestion(false);
    }
  };

  const openSearch = () => {
    appContext.findWeather(openSearchValue);
    setShouldShowSuggestion(false);
    console.log(openSearchValue);
  };

  // Function to fetch weather based on location
  const handleFetchWeather = (location) => {
    appContext.setlocationReference(location);
    setShouldShowSuggestion(false);
  };

  // Debounce function for search input

  const handleTextDebounce = useCallback(
    debounce((e) => {
      setOpenSearchValue(e);
      handleSearch(e);
    }, 800),
    []
  );

  // Extracting data from context
  const iconText = appContext?.weatherData?.current?.condition?.text?.trim();
  // console.log(iconText);
  const currentData = appContext?.weatherData?.current;
  const locationData = appContext?.weatherData?.location;
  const forecast = appContext?.weatherData?.forecast;
  const temps = appContext.iscelsius
    ? Math.round(appContext?.weatherData?.current?.temp_c) + "\u00B0C"
    : Math.round(appContext?.weatherData?.current?.temp_f) + "\u00B0F";

  // console.log(appContext.wLoading)
  // Rendering UI

   const handleNextDayForcast = async (item)=>{
    navigation.navigate("NextDayScreens", item)
   }

  return (
    <View style={styles.HomeScreenContainer}>
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
        {appContext.wLoading && (
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              style={{ width: 250, height: 250, zIndex: 10 }}
              source={require("../assets/icon/laoding.json")}
              autoPlay
            />
          </View>
        )}


          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 10,
              opacity: appContext.wLoading ? 0.5 : 1,
            }}
          >
            <SafeAreaView>
              {/* Header Section */}
              <View style={styles.feAreaContainer}>
                <TouchableOpacity
                  onPress={openDrawer}
                  style={{ position: "absolute", zIndex: 1, width: 60 }}
                >
                  <Bars3BottomLeftIcon
                    size="32"
                    strokeWidth={2}
                    color="#002226"
                  />
                </TouchableOpacity>
                <Text style={styles.appName}>
                  Forecast
                  <Text style={{ color: "#ff9b00" }}> WX</Text>
                </Text>
              </View>
            </SafeAreaView>

            {/* Search Bar Section */}
            <View
              style={[
                styles.searchBarContainer,
                appContext?.locations?.length > 0 &&
                  shouldShowSuggestion && {
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomWidth: 0,
                  },
              ]}
            >
              <TextInput
                onChangeText={handleTextDebounce}
                onSubmitEditing={openSearch}
                style={[styles.searchInputBar, { fontFamily: "MeriendaBold" }]}
              />
              <TouchableOpacity
                onPress={openSearch}
                style={styles.magnifyingIconContainer}
              >
                <MagnifyingGlassIcon size={27} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Search Suggestions */}
            <View style={styles.outPutContainer}>
              <View style={styles.outPutContant}>
                {shouldShowSuggestion &&
                  appContext?.locations?.map((location) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          handleFetchWeather(
                            `${location?.name},${location?.country}`
                          )
                        }
                        key={location?.id}
                        style={{...styles.outPutLocationContent}}
                      >
                        <Text style={{ marginBottom: -5, marginRight: 5 }}>
                          <MapPinIcon size={20} color="gray" />
                        </Text>
                        <Text
                          style={[
                            styles.outPutLocationText,
                            { fontFamily: "MeriendaBold" },
                          ]}
                        >
                          {location?.name}, {location?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>

              {/* Weather Output Section Airport Village */}

              <View
                onTouchEnd={() => setShouldShowSuggestion(false)}
                blurRadius={50}
                style={styles.outputIconContainer}
              >
                {currentData && (
                  <Text
                    style={[
                      styles.locationName,
                      {
                        fontFamily: "MeriendaBold",
                        opacity:
                          appContext?.locations.length > 1 &&
                          shouldShowSuggestion
                            ? 0.3
                            : 1,
                      },
                    ]}
                  >
                    {locationData?.name},{""}
                    <Text style={{ fontSize: 15 }}>
                      {locationData?.country}
                    </Text>
                  </Text>
                )}

                {/* Weather Icon  */}
                {iconText && (
                  // <LottieView
                  //   style={[
                  //     styles.OutputIcon,
                  //     { transform: weatherData[iconText]?.transform },
                  //   ]}
                  //   source={weatherData[iconText]?.require}
                  //   speed={weatherData[iconText]?.speed}
                  //   autoPlay
                  // />

                  <LottieView
                    style={[
                      styles.OutputIcon,
                      {
                        transform:
                          weatherData[iconText]?.transform ||
                          weatherData.other.transform,
                      },
                    ]}
                    source={
                      weatherData[iconText]?.require ||
                      weatherData.other.require
                    }
                    speed={
                      weatherData[iconText]?.speed || weatherData.other.speed
                    }
                    autoPlay
                  />
                )}

                {/* Temperature display */}
                {/* <Image
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: `https://${appContext?.weatherData?.current?.condition?.icon}`,
                  }}
                /> */}
                {currentData && (
                  <View style={styles.TemperatureDisplay}>
                    {/* temperature scale */}
                    <View style={styles.TemperatureScale}>
                      <Text
                        style={{
                          fontFamily: "MeriendaBold",
                          ...styles.conditionText,
                        }}
                      >
                        {iconText}
                      </Text>
                      <Text style={styles.temperature}>{temps}</Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Hourly Condition */}
              {forecast && (
                <HourlyCondition
                  data={appContext?.weatherData?.forecast?.forecastday[0]?.hour}
                />
              )}

              {/* forcast for next day */}
              {/* {console.log("x", forecast?.forecastday)} */}
              {forecast && (
                <View style={styles.nextDayContainer}>
                  <View style={styles.nextDayContent}>
                    <CalendarDaysIcon size="22" color="#102426" />
                    <Text
                      style={{
                        fontFamily: "MeriendaBold",
                        ...styles.nextDayText,
                      }}
                    >
                      Daily forecast
                    </Text>
                  </View>

                  {appContext?.weatherData?.forecast?.forecastday?.map(
                    (item, index) => {
                      // console.log("-------------------");
                      // console.log(item);
                      let conditionText = item?.day?.condition?.text?.trim();
                      console.log(conditionText);
                      let date = new Date(item?.date);
                      let options = { weekday: "long" };
                      let dayName = date.toLocaleDateString("en-US", options);

                      let maxtemp_c = appContext.iscelsius
                        ? Math.round(item?.day?.maxtemp_c) + "\u00B0C"
                        : Math.round(item?.day?.maxtemp_f) + "\u00B0F";

                      let mintemp_c = appContext.iscelsius
                        ? Math.round(item?.day?.mintemp_c) + "\u00B0C"
                        : Math.round(item?.day?.mintemp_f) + "\u00B0F";

                      return (
                        <TouchableOpacity
                          style={[
                            styles.forecastdayContainer,
                            styles.shadowProp,
                          ]}
                          key={index}
                          // onPress={() =>navigation.navigate("NextDay", {item})}
                          onPress={() => handleNextDayForcast(item)}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <LottieView
                              style={[
                                styles.forecastdayIcon,
                                {
                                  transform:
                                    weatherData[conditionText]?.transform ||
                                    weatherData.other.transform,
                                },
                              ]}
                              source={
                                weatherData[conditionText]?.require ||
                                weatherData.other.require
                              }
                              speed={
                                weatherData[conditionText]?.speed ||
                                weatherData.other.speed
                              }
                              autoPlay
                            />

                            <View style={styles.ConditionMiddle}>
                              <Text
                                style={{
                                  fontFamily: "MeriendaBold",
                                  ...styles.ConditionMiddleContent,
                                }}
                              >
                                {dayName}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "MeriendaBold",
                                  ...styles.ConditionMiddleContent,
                                }}
                              >
                                {conditionText}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.ConditionEnd}>
                            <Image
                              source={require("../assets/otherIcon/scale4.png")}
                              style={{ height: "100%", width: 30, width: 40 }}
                            />
                            <View
                              style={{
                                flexDirection: "column",
                                marginLeft: 7,
                                marginRight: 6,
                              }}
                            >
                              <Text
                                style={{
                                  marginBottom: 10,
                                  fontFamily: "MeriendaBold",
                                  ...styles.scaleLabel,
                                }}
                              >
                                {maxtemp_c}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "MeriendaBold",
                                  ...styles.scaleLabel,
                                }}
                              >
                                {mintemp_c}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  )}
                </View>
              )}
            </View>
          </ScrollView>
       
      </ImageBackground>
    </View>
  );
};

export default HomeScreens;

// Stylesheet for the component
const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
  },

  // Header Section
  feAreaContainer: {
    top: 5,
  },
  appName: {
    flex: 1,
    fontSize: 25,
    marginTop: 1,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    color: "#002f34",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },

  //Search Bar Section
  searchBarContainer: {
    marginTop: 20,
    width: "100%",
    height: 47,
    backgroundColor: "rgba(255, 255, 255, 0.56)",
    borderRadius: 25,
    borderColor: "rgba(255, 242, 242, .7)",
    borderWidth: 1,
    padding: 2,
    paddingLeft: 60,
  },
  magnifyingIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 45,
    height: "100%",
    marginLeft: "auto",
  },
  searchInputBar: {
    width: "100%",
    height: "100%",
    fontSize: 18,
    marginLeft: 20,
    position: "absolute",
    marginRight: 50,
    paddingBottom: 6
  },

  // Search Suggestions
  outPutContainer: {
    position: "relative",
    minHeight: 300,
    marginBottom: 30,
  },
  outPutContant: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.56)",
    width: "100%",
    zIndex: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  outPutLocationContent: {
    borderTopColor: "rgba(255, 242, 242, .7)",
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 8,
    paddingLeft: 10,
    marginRight: 10,
    overflow: "hidden",

  },
  outPutLocationText: {
    fontSize: 17,
    flexWrap: "wrap",
    color: "#102426",
  },

  // Weather Output Section
  outputIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationName: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 30,
    marginBottom: 15,
    color: "#102426",
  },

  // Weather Icon

  OutputIcon: {
    width: 160,
    height: 160,
    margin: "0 auto",
  },
  // Temperature display
  TemperatureDisplay: {},
  TemperatureScale: {
    textAlign: "center",
  },
  temperature: {
    fontSize: 55,
    fontWeight: "bold",
    textAlign: "center",
    color: "#102426",
  },
  conditionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: -3,
    color: "#102426",
  },

  // forcast for next day
  nextDayContainer: {
    marginBottom: 8,
    marginTop: 10,
  },
  nextDayContent: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginBottom: 15,
    alignItems: 'center'
  },
  nextDayText: {
    color: "#102426",
    marginLeft: 10,
    fontSize: 15
  },

  forecastdayContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#edfdff",
    marginBottom: 14,
    borderRadius: 10,
    padding: 10,
  },
  shadowProp: {
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },

  forecastdayIcon: {
    width: 60,
    height: 60,
  },
  ConditionMiddleContent: {
    fontSize: 15,
    marginLeft: 10,
    color: "#102426",
  },
  ConditionEnd: {
    flexDirection: "row",
    alignItems: "center",
  },
  scaleLabel: {
    fontSize: 17,
    // fontWeight: "bold",
    color: "#102426",
  },
});