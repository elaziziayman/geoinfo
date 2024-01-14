import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const Welcome = ({ navigation, user }) => {
  const navigateToForm = () => {
    navigation.navigate('Form');
  };

  const handleLogout = () => {
    user = null;
    console.log(user)
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Bienvenue ${user.nom} ${user.prenom}`}</Text>

      <Image
        source={require('../assets/auc.png')} // Update with the actual path to your image
        style={styles.image}
      />

      <View style={styles.logoutButtonContainer}>
        <Button title="Déconnexion" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400, // Adjust the width and height according to your image
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Welcome;
