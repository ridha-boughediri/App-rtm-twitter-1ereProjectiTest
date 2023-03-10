import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      let response = await axios.post('http://localhost:8888/auth/login', {
        email: email,
        password: password
      });

      let data = response.data;
      console.log(data.access_token);
      await AsyncStorage.setItem('access_token', data.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const res = await AsyncStorage.getItem('access_token');
      setToken(res);
    };
    getInfo();
  }, []);


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder='Email'
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder='Mot de passe'
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
      <View style={styles.linksContainer}>
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('InscriptionScreen')}>
          <Text style={styles.linkText}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => console.log('Mot de passe oublié')}>
          <Text style={styles.linkText}>Mot de passe oublié</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  button: {
    backgroundColor: '#0E64D2',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  linksContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%'
  },
  link: {
    alignItems: 'center'
  },
  linkText: {
    color: '#1E90FF'
  }
});
export default LoginScreen;
