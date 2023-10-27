// Login.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity,Button } from 'react-native';

const usuarioImage = require('./imagenes/usuario-2.png');
const cerrarImage = require('./imagenes/candado.png');

export const Login = (props:any) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>DONAVIDA+</Text>
      <Image
        source={require('./imagenes/imagenPrincipal.png')} 
        style={styles.image}
      />
      <Text style={styles.welcomeText}>¡BIENVENIDO!</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputIconContainer}>
          <Image source={usuarioImage} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.inputIconContainer}>
          <Image source={cerrarImage} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { textAlign: 'left' }]}
            placeholder="Contraseña"
            secureTextEntry
            placeholderTextColor="white"
          />
        </View>
  
        <TouchableOpacity
          onPress={() => props.navigation.navigate('TabScreen')}
          style={styles.loginButton}>
          <Text style={styles.buttonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
          <Text style={styles.forgotPasswordText}>Olvidé mi contraseña</Text>
          <Text style={styles.createAccountText} onPress={() => props.navigation.navigate('TipoDeUsuario')}>Crea tu cuenta</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
    marginTop: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
  },
  image: {
    width: 200,
    height: 180,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#A4161A',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  inputContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  inputIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BA181B',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    width: 270,
    alignSelf: 'center'
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  loginButton: {
    backgroundColor: '#660708',
    borderRadius: 25,
    padding: 15,
    marginTop: 5,
    alignItems: 'center',
    width: 270,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#660708',
  },
  createAccountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#660708',
    marginTop: 4
  },
});