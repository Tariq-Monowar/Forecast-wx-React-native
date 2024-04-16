import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreens from '../screens/HomeScreens';
import NextDayScreens from '../screens/NextDayScreens';
import DrawerContent from '../drower/HomePageDrower';
import Announcement from '../screens/Announcement';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreens}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Homes"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NextDayScreens"
          component={NextDayScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="message"
          component={Announcement}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
