import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './navigation/Navigation';
import Login from './components/Login'; // Adjust the import based on your actual file structure
import { loginUser, signUpUser, logoutUser } from './utils/auth';
import Signup from './components/Signup';

const Stack = createStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  let authenticatedUser  = null;

//   const handleSetUser = (user) => {
//     setAuthenticatedUser(user);
// };

  useEffect(() => {
    // Check authentication status and update the state accordingly
    // For now, let's assume setAuthenticated(true) if the user is authenticated
    // setAuthenticated(true);
  }, []);

  const handleLogin = async (email, password, navigation) => {
    var dataJson = {email : email,
      password: password};
      console.log(JSON.stringify(dataJson))
   try {
          const response = await fetch('http://192.168.100.8:8085/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataJson),
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData.role.id);
            if (responseData.role.id === 2) {
              if(responseData.statut.id === 8){
                console.log(responseData);
              console.log('Logged in as citoyen');
              // navigation.setParams({ user: responseData });

              // authenticatedUser = responseData;
              // setAuthenticated(true);
              // navigation.navigate('Main');
              navigation.navigate('Main', { user: responseData });
              }
              // Handle login for 'citoyen' role
              
              
              
              

              
              
            } 
          } else {
            console.error('Error while login');
            // Handle login failure
          }
        } catch (error) {
          console.error('Communication error with the server.', error);
          // Handle communication error with the server
          throw error;
        } 
    // try {
    //   await loginUser(email, password);
    //   setAuthenticated(true);
    // } catch (error) {
    //   console.error('Login Error: ', error);
    // }
  };

  const handleSignup = async (nom, prenom, cin, email, password, navigation) => {
    var userData = {nom: nom, prenom : prenom, cin : cin, email : email,
      password: password, role  : {id: 2}};
      console.log(JSON.stringify(userData))
    try {
      const response = await fetch('http://192.168.100.8:8085/utilisateurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log('User created successfully.');
        navigation.navigate('Login');
        // Handle successful signup
      } else {
        console.error('Error while creating user.');
        // Handle signup failure
      }
    } catch (error) {
      console.error('Communication error with the server.', error);
      // Handle communication error with the server
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout Error: ', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => <Login {...props} onLogin={handleLogin} />}
          </Stack.Screen>
          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
          >
            {(props) => <Navigation {...props} />}
          </Stack.Screen>
     
          
        <Stack.Screen
          name="Signup"
          options={{ headerShown: false }}
        >
        {(props) => <Signup {...props} onSignup={handleSignup} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
 
}
