import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

const faqsData = [
  {
    question: "1. How can I see tomorrow's weather forecast?",
    answer:
      "After selecting a specific day from the Home screen, you will be directed to the next day's forecast automatically.",
  },
  {
    question: "2. How do I switch between Celsius and Fahrenheit?",
    answer:
      "Switch between Celsius units and Fahrenheit units by tapping the temperature values ​​displayed on the drawer screen.",
  },
  {
    question:
      "3. How do I switch between different weather conditions, such as temperature, humidity, wind speed, and UV index?",
    answer:
      "Swipe horizontally to view the hourly forecast for different weather conditions, including temperature, humidity, wind speed, and UV index",
  },
  {
    question: "4. How do I view the probability of rain, snow, or cloud cover?",
    answer: `Tap on the "Probability" tab located at the bottom of the screen to view the chance of rain, snow, or cloud cover for the selected day.`,
  },
  {
    question: "5. Can I view more detailed weather probability information?",
    answer: `Yes, you can view more detailed weather information by tapping on the "View More" button located at the bottom of the screen. To minimize the details, tap on the "View Less" button.`,
  },
  {
    question: "6. How do I know the time for each hourly forecast?",
    answer:
      "The time for each hourly forecast is displayed on the left side of the screen in a 12-hour format with AM/PM indication.",
  },
  {
    question: "7. How do I interpret the probability indicators?",
    answer:
      "The probability indicators represent the likelihood of rain, snow, or cloud cover expressed as a percentage (%).",
  },
  {
    question: "8. What visual representations does the app use to depict weather conditions?",
    answer:
      "The app features informative visuals such as icons and animations, making weather data more engaging and easier to understand.",
  },
];

const Announcement = () => {
  const navigate = useNavigation();

  return (
    <View style={styles.AnnouncementContainer}>
      <StatusBar
        translucent={true}
        style="dark"
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
              <Text style={[styles.dayName, { fontFamily: "MeriendaBold" }]}>
                Instructions
              </Text>
            </View>
          </SafeAreaView>

          <View style={styles.AnnouncementConteiner}>
            {faqsData.map((faq, index) => {
              return (
                <View
                  key={index}
                  style={{ ...styles.faqContent, ...styles.shadowProp }}
                >
                  <Text style={{ fontFamily: "MeriendaBold", fontSize: 18.5, color: "#102426" }}>
                    {faq.question}
                  </Text>
                  <Text style={{ fontSize: 17, marginTop: 2, opacity: .9, lineHeight: 23, color: "#102426" }}>
                    {faq.answer}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Announcement;




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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayName: {
    flex: 1,
    fontSize: 25,
    marginTop: 1,
    textAlign: "center",
    color: "#002f34",
    zIndex: 0,
    position: "absolute",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  notificationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  // Announcement Conteiner
  AnnouncementConteiner: {
    marginHorizontal: 10,
    marginTop: 25,
  },
  faqContent: {
    backgroundColor: "#d0f1f7",
    marginBottom: 12,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingBottom: 10
    
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 1,
  },
});


// // ExponentPushToken[-0cxvTA8xOuihcxoHqbzr1]
// // {   "title": {     "english": "Hello",     "bangla": "hello"   },   "description": {     "english": "An object with properties for English and Bengali descriptions",     "bangla": "An object with properties for English and Bengali descriptions."   },  "imageUrl": "https://images.pexels.com..." }
