import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import AppNavigation from './navigation/AppNavigation';
import {AppContextProvider} from './context/AppContext';
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <AppContextProvider>
      <AppNavigation />
    </AppContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
