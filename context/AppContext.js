import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getData, storageData } from "./../util/asyncstorage";
import { ToastAndroid } from "react-native";
// const apikey = "ac9f700bd5764b35be254001242602"
const apikey = "f3989aabde9b4733adc50911242403";

export const AppContext = createContext(null);

export const UseAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [findLication, setFindLication] = useState("");
  const [locations, setLocations] = useState([]);

  const [locationReference, setlocationReference] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [wLoading, setWLoading] = useState(true);

  const [iscelsius, setIscelsius] = useState(true);
  const [iskm, setIskm] = useState(true);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const findCity = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${apikey}&q=${cityName}`
      );
      setLocations(res.data);
    } catch (error) {
      console.log(121, error);
    }
  };
  useEffect(() => {
    if (weatherData != null) findCity(findLication);
  }, [findLication]);

  const findWeather = async (cityName) => {
    try {
      setWLoading(true);
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cityName}&days=7&aqi=no&alerts=no`
      );
      setWeatherData(res.data);
      console.log(res.data)
      setWLoading(false);
      await storageData("cityName", cityName);
    } catch (error) {
      if (weatherData != null) showToast("location not found!");
      setWLoading(false);
    }
  };

  const getSincData = async () => {
    const weatherData = await getData("cityName");
    if (weatherData !== null) {
      findWeather(weatherData);
    } else {
      findWeather("Dhaka, Bangladesh");
    }
  };
  useEffect(() => {
     getSincData();
  }, []);

  useEffect(() => {
     findWeather(locationReference);
  }, [locationReference]);

  const getStoreData = async () => {
    // Retrieve stored string values from AsyncStorage
    const cString = await getData("temperature");
    const kmString = await getData("distance");

    const c = cString === "true";
    const km = kmString === "true";

    console.log(c);
    console.log(km);

    setIscelsius(c);
    setIskm(km);
  };

  useEffect(() => {
    if (weatherData != null) getStoreData();
  }, [iskm, iscelsius]);

  // useEffect(() => {
  //   const setUnit = async () => {
  //     await storageData("temperature", iscelsius);
  //     // await storageData("iskmh", iskm);
  //   };
  //    setUnit();
  // }, [iscelsius]);

  return (
    <AppContext.Provider
      value={{
        setFindLication,
        locations,
        setlocationReference,
        weatherData,
        wLoading,
        iscelsius,
        setIscelsius,
        iskm,
        setIskm,
        findWeather,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// const forecastEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${params.cityName}&days=${params.days}&aqi=yes&alerts=no`;
// const locationEndpoint = `https://api.weatherapi.com/v1/search.json?key=${apikey}&q=${params.cityName}`;