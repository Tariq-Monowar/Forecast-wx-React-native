import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrowerList from "../Components/DrowerList";
import { useNavigation } from "@react-navigation/native";

const DrawerContent = ({ navigation }) => {
  const navigations = useNavigation();

  const { width } = Dimensions.get("screen");

  const colors = ["#acd7dbfa"];

  const onShare = async () => {
    try {
      await Share.share({
        message:
          "Forcast Wx.\nyour weather assistant \n\n https://play.google.com/store/apps/details?id=com.tariqmonowar.forecastwx",
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#edfdff",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {colors.map((x, i) => (
        <View
          style={[
            styles.bgCircle,
            {
              backgroundColor: x,
              transform: [
                { translateX: -(width / 2) + (i * width) / colors.length },
                {
                  translateY:
                    -(width * 0.8) - ((i / 0.75) * width) / colors.length,
                },
              ],
            },
          ]}
          key={i.toString()}
        />
      ))}
      <ScrollView>
        <SafeAreaView>
          <View style={styles.headerSection}>
            <Image
              source={require("../assets/otherIcon/drowerImage4.png")}
              style={styles.headerImage}
            />
            <Text style={styles.headerAppName}>
              Forcast <Text style={{ color: "orange" }}>WX</Text>
            </Text>
          </View>
        </SafeAreaView>
        <View>
          <DrowerList />
        </View>
    
          <>
            {/* <Text style={{ ...styles.AboutTitle, fontFamily: "MeriendaBold" }}>
              Our Announceme
            </Text>

            <TouchableOpacity
              onPress={() => navigations.navigate('message')}
              style={{ ...styles.AboutMeContant, ...styles.shadowProp, justifyContent: 'space-between' }}
            >
              <Text
                style={{ fontFamily: "MeriendaBold", ...styles.contantText }}
              >
                Announcement
              </Text>

              <Image
                style={{...styles.AboutMeIcon, marginRight: 15, width: 34, }}
                source={require("../assets/otherIcon/Announcement2.png")}
              />
            </TouchableOpacity> */}

            <Text style={{ ...styles.AboutTitle, fontFamily: "MeriendaBold" }}>
              communication
            </Text>
            <View style={styles.AboutMeContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "https://www.linkedin.com/in/tariq-monowar-hossain-3a7b941bb/"
                  );
                }}
                style={{ ...styles.AboutMeContant, ...styles.shadowProp }}
              >
                <Image
                  style={styles.AboutMeIcon}
                  source={require("../assets/otherIcon/linkedin3.png")}
                />
                <Text
                  style={{ fontFamily: "MeriendaBold", ...styles.contantText }}
                >
                  dev linkedin
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "https://www.facebook.com/profile.php?id=100080938471859"
                  );
                }}
                style={{ ...styles.AboutMeContant, ...styles.shadowProp }}
              >
                <Image
                  style={styles.AboutMeIcon}
                  source={require("../assets/otherIcon/facebook1.png")}
                />
                <Text
                  style={{ fontFamily: "MeriendaBold", ...styles.contantText }}
                >
                  dev Facebook
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ ...styles.AboutTitle, fontFamily: "MeriendaBold" }}>
              share the app
            </Text>
            <View style={styles.AboutMeContainer}>
              <TouchableOpacity
                onPress={onShare}
                style={{ ...styles.AboutMeContant, ...styles.shadowProp }}
              >
                <Image
                  style={styles.AboutMeIcon}
                  source={require("../assets/otherIcon/share.png")}
                />
                <Text
                  style={{ fontFamily: "MeriendaBold", ...styles.contantText }}
                >
                  share
                </Text>
              </TouchableOpacity>
            </View>
          </>
      </ScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  headerSection: {
    marginLeft: 12,
    flex: 1,
    // justifyContent: 'center',
    marginTop: 17,
    height: 180,
  },
  headerImage: {
    width: 80,
    height: 80,
  },
  headerAppName: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 4,
    color: "#102426",
  },
  bgCircle: {
    position: "absolute",
    width: 530,
    height: 530,
    borderRadius: 350,
    opacity: 0.3,
    marginTop: -30,
    marginLeft: -15,
    shadowColor: "#00e7ff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 0,
  },

  AboutMeContainer: {},
  AboutTitle: {
    fontSize: 17,
    marginLeft: 10,
    marginBottom: 10,
    color: "#002f34",
    marginTop: 3,
  },
  AboutMeContant: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    // borderWidth: 1,
    // borderColor: '#3e6469de',
    backgroundColor: "#d0f1f7",
    borderRadius: 5,
    height: 45,
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
    elevation: 1,
  },
  contantText: {
    fontSize: 18,
    color: "#002f34",
    marginLeft: 10,
    marginTop: 4,
  },

  AboutMeIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 8,
  },
});

// onPress={() => navigation.navigate("Home")

// import React from 'react';
// import { Dimensions, StyleSheet, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// conimport { useNavigation } from '@react-navigation/native';
// st { width } = Dimensions.get('screen');
// const colors = ['#0052d6', '#11998b', '#30821b'];

// export default function CircleBackground() {
//     return (
//         <View style={styles.container}>
//             {colors.map((x, i) => (
//                 <View style={[styles.bgCircle1, {
//                     backgroundColor: x,
//                     transform: [
//                         { translateX: -(width / 2) + (i * width / colors.length) },
//                         { translateY: -(width * 0.75) - (i / 0.75 * width / colors.length) }
//                     ]
//                 }]} key={i.toString()} />
//             ))}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     bgCircle1: {
//         position: 'absolute',
//         height: width * 2,
//         width: width * 2,
//         borderRadius: width,
//         left: 0,
//         top: 0
//     },
// })