import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/solid';

const screenWidth = Dimensions.get('window').width;

function convertFormat(dateTimeString) {
  const [datePart, timePart] = dateTimeString.split(' ');
  const [hours, minutes] = timePart.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  const formattedHours = hours12 < 10 ? `0${hours12}` : hours12; // Add leading zero if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if necessary
  return `${formattedHours}:${formattedMinutes} ${period}`;
}

const conditionKeys = {
  'chance of rain': 'chance_of_rain',
  'chance of snow': 'chance_of_snow',
  cloud: 'cloud',
};

const HourlyContentItem = ({hour, condition}) => {
  // console.log(condition);
  // const conditionText = hour?.condition?.text?.trim();
  const time = convertFormat(hour?.time);
  const value = Math.round(hour[conditionKeys[condition]]);
  const unit =
    condition === 'chance of rain'
      ? '%'
      : condition === 'chance of snow'
      ? '%'
      : condition === 'cloud'
      ? '%'
      : '';
  function addLeadingZeros(number) {
    return `${number}`.padStart(2, '0');
  }
  return (
    <View style={styles.hourlyContent}>
      <Text style={styles.timeText}>{time}</Text>
      <Progress.Bar
        progress={value / 100}
        width={screenWidth / 1.7}
        color="#84b3ba"
        height={17}
        borderRadius={10}
        borderWidth={1.5}
      />
      <Text style={{...styles.valueText, color: "#102426"}}>
        {addLeadingZeros(value)}
        {unit}
      </Text>
    </View>
  );
};

const ConditionButton = ({text, onPress, isSelected}) => (
  <TouchableOpacity
    style={{flexDirection: 'row', alignItems: 'center'}}
    onPress={onPress}>
    <Text style={[styles.conditionBtnText, isSelected && styles.selected]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const Chance = data => {
  const [condition, setCondition] = useState('cloud');
  const [showAll, setShowAll] = useState(false); // State to determine if all items should be shown

  const HourlyData = data?.data;
  // Determine the number of items to show based on showAll state
  const visibleItems = showAll ? HourlyData.length : 5;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/otherIcon/probabilitys.png')}
          style={styles.clockIcons}
        />
        <Text
          style={{
            fontFamily: 'MeriendaBold',
            color: '#102426',
            ...styles.headerText,
          }}>
          Probability
        </Text>
      </View>

      <View style={styles.conditionBtnGroup}>
        {['cloud', 'chance of rain', 'chance of snow'].map(
          (conditionBtn, index) => (
            <ConditionButton
              key={conditionBtn}
              text={conditionBtn}
              onPress={() => setCondition(conditionBtn)}
              isSelected={condition === conditionBtn}
            />
          ),
        )}
      </View>
      <View style={[styles.hourlyContainer, styles.shadowProp]}>
        {HourlyData?.slice(0, visibleItems).map((hour, index) => (
          <HourlyContentItem key={index} hour={hour} condition={condition} />
        ))}
      </View>

      <TouchableOpacity
        style={styles.toggleBtn}
        onPress={() => setShowAll(!showAll)}>
        <Text style={styles.toggleBtnText}>
          {!showAll && HourlyData.length > 5 ? 'View More' : 'View Less'}
        </Text>
        {!showAll && HourlyData.length > 5 ? (
          <ChevronDownIcon size={28} color="#4fa3a9" />
        ) : (
          <ChevronUpIcon size={25} color="#4fa3a9" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Chance;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    marginTop: 10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  headerText: {
    fontSize: 16,
    marginLeft: 10,
  },
  clockIcon: {
    width: 22,
    height: 22,
    marginLeft: 5,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  headerText: {
    fontFamily: 'MeriendaBold',
    fontSize: 16,
    marginLeft: 8,
  },
  clockIcons: {
    width: 29,
    height: 29,
    marginLeft: 10,
    marginBottom: -6,
  },
  conditionBtnGroup: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 5,
  },
  conditionBtnText: {
    fontFamily: 'MeriendaBold',
    color: '#102426',
    fontSize: 16,
    marginHorizontal: 10,
  },
  selected: {
    color: '#fff',
    backgroundColor: '#84b3ba',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 6,
    marginRight: 2,
    marginLeft: 2,

    //active
  },
  hourlyContainer: {
    width: '100%',
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
    alignItems: 'center',
    flexDirection: 'row',

    marginVertical: 10,
    marginHorizontal: 10,
  },
  timeText: {
    fontWeight: 'bold',
    textAlign: 'left',
    // fontFamily: "MeriendaBold",
    width: 75,
    fontSize: 16,
    color: '#002f34',
  },
  forecastHourlyIcon: {
    width: 55,
    height: 55,
  },
  conditionText: {
    fontFamily: 'MeriendaBold',
    fontSize: 13,
    marginTop: -3,
  },
  valueText: {
    fontFamily: 'MeriendaBold',
    fontSize: 18,
    marginLeft: 10,
  },
  toggleBtn: {
    marginLeft: 'auto',
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
  },
  toggleBtnText: {
    fontFamily: 'MeriendaBold',
    fontSize: 16,
    marginTop: -7,
    color: '#4fa3a9',
  },
});
