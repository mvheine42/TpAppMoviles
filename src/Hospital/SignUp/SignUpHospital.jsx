import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const hospitalImage = require('../../../imagenes/hospital.png');
const correoImage = require('../../../imagenes/correo-electronico.png');
const usuarioImage = require('../../../imagenes/usuario-2.png');
const candadoImage = require('../../../imagenes/candado.png');
const telephoneImage = require('../../../imagenes/telephone.png');

export const SignUpHospital = (props) => {
  
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [responsibleContact, setResponsibleContact] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleContinue = () => {
    const usuarioData = {
      nombre,
      telefono,
      email,
      responsibleName,
      responsibleContact,
      password
    };
  
    props.navigation.navigate('LocationHospital', { usuarioData });
  };

  const isFormComplete = () => {
    return (
      nombre &&
      telefono &&
      email &&
      responsibleName &&
      responsibleContact &&
      password &&
      repeatPassword &&
      password === repeatPassword
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Sign Up</Text>

      <View style={styles.block}>
        <Image source={hospitalImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="white"
          onChangeText={setNombre}
        />
      </View>

      <View style={styles.block}>
        <Image source={telephoneImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={setTelefono}
        />
      </View>
      
      <View style={styles.block}>
        <Image source={correoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="white"
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.block}>
        <Image source={usuarioImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre del Responsable"
          placeholderTextColor="white"
          onChangeText={setResponsibleName}
        />
      </View>

      <View style={styles.block}>
        <Image source={correoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Correo del Responsable"
          placeholderTextColor="white"
          onChangeText={setResponsibleContact}
        />
      </View>

      <View style={styles.block}>
        <Image source={candadoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.block}>
        <Image source={candadoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Repetir Contraseña"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={setRepeatPassword}
        />
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={[styles.continueButton, !isFormComplete() && styles.disabledButton]}
        /*disabled={!isFormComplete()}*/
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    marginTop: 25,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#A4161A',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BA181B',
    borderRadius: 35,
    padding: 10,
    marginBottom: 15,
    width: 310,
    alignSelf: 'center'
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 8
  },
  continueButton: {
    backgroundColor: '#660708',
    borderRadius: 25,
    padding: 15,
    marginTop: 2,
    alignItems: 'center',
    width: 270,
    alignSelf: 'center',
    marginBottom: 35
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#A8A8A880',
  }
});

export default SignUpHospital;