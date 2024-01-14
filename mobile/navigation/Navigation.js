import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '../components/Welcome';
import Form from '../components/Form';
import MyRequests from '../components/MyRequests';
import Map from '../components/Map';
import CustomTabBar from '../components/CustomTabBar';
import Signup from '../components/Signup';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const AppScreens = ({ user }) => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <Tab.Screen name="Accueil">
      {(props) => <Welcome {...props} user={user} />}
    </Tab.Screen>

    <Tab.Screen name="Nouvelle demande">
      {(props) => <Form {...props} user={user} />}
    </Tab.Screen>
    <Tab.Screen name="Mes demandes">
      {(props) => <MyRequests {...props} user={user} />}
    </Tab.Screen>

    <Tab.Screen name="Carte">
      {(props) => <Map {...props} user={user} />}
    </Tab.Screen>
  </Tab.Navigator>
);

const Navigation = ({ route }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { user } = route.params || {};

  console.log(route);

  

  console.log("authenticated user : " + user);

  useEffect(() => {
    setAuthenticated(user !== undefined);
  }, [user]);

  // const handleLogout = async () => {
  //   try {
  //     await logoutUser();
  //     setAuthenticated(false);
  //   } catch (error) {
  //     console.error('Logout Error: ', error);
  //   }
  // };

  return <AppScreens  user={user}/>;
};

export default Navigation;


