import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import COLORS from '../constants/colors';

const Signup = ({ navigation , onSignup}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cin, setCin] = useState('');
    const [confirmpwd, setConfirmpwd] = useState('');

    const handleSignup = async () => {
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('CIN:', cin);
        console.log('nom:', nom);
        console.log('Prenom:', prenom);
        console.log('confirmation mot de passe :', confirmpwd);
        if (password !== confirmpwd) {
            alert("Les mots de passe ne correspondent pas. Veuillez réessayer.");
            return;
          }

        await onSignup(nom,prenom,cin,email, password, navigation);

        // Ajoutez ici la logique de connexion
      };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 22 }}>
        <View style={{ flex: 1, marginVertical: 22 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
            Créez votre compte
          </Text>

        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Nom</Text>
          <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
            <TextInput placeholder='Entrez votre nom' placeholderTextColor={COLORS.black} keyboardType='default' style={{ width: '100%' }} onChangeText={(text) => setNom(text)} />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Prénom</Text>
          <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
            <TextInput placeholder='Entrez votre prénom' placeholderTextColor={COLORS.black} keyboardType='default' style={{ width: '100%' }} onChangeText={(text) => setPrenom(text)}/>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>C.I.N</Text>
          <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
            <TextInput placeholder='Entrez votre CIN' placeholderTextColor={COLORS.black} keyboardType='default' style={{ width: '100%' }} onChangeText={(text) => setCin(text)} />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>E-mail</Text>
          <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
            <TextInput placeholder='Entrez votre E-mail' placeholderTextColor={COLORS.black} keyboardType='email-address' style={{ width: '100%' }} onChangeText={(text) => setEmail(text)} />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Mot de passe</Text>
          <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
            <TextInput placeholder='Entrez votre mot de passe' placeholderTextColor={COLORS.black} secureTextEntry={isPasswordShown} style={{ width: '100%' }} onChangeText={(text) => setPassword(text)} />
            <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{ position: 'absolute', right: 12 }}>
              {isPasswordShown == true ? (
                <Ionicons name='eye-off' size={24} color={COLORS.black} />
              ) : (
                <Ionicons name='eye' size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Confirmation du Mot de passe</Text>
          <View style={{ width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
            <TextInput placeholder='Confirmez votre mot de passe' placeholderTextColor={COLORS.black} secureTextEntry={isPasswordShown} style={{ width: '100%' }} onChangeText={(text) => setConfirmpwd(text)} />
            <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{ position: 'absolute', right: 12 }}>
              {isPasswordShown == true ? (
                <Ionicons name='eye-off' size={24} color={COLORS.black} />
              ) : (
                <Ionicons name='eye' size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional input fields and components go here */}

        <Button title='Sign Up' filled onPress={handleSignup} style={{ marginTop: 18, marginBottom: 4 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 22 }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Vous avez déjà un compte</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginLeft: 6 }}>Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
