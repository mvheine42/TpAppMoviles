import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const profileImage = require('../imagenes/usuario.png');

export const HomeHospital = () => {
  const navigation = useNavigation();

  const navigateToTurnos = () => {
    navigation.navigate('TurnosHospital');
  };

  const navigateToAgregarPedido = () => {
    navigation.navigate('RequestHospital');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bienvenido!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfileHospital')}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={navigateToTurnos} style={styles.button}>
        <Text style={styles.buttonText}>Turnos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToAgregarPedido} style={styles.button}>
        <Text style={styles.buttonText}>+ Agregar pedido</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>- DonaVida 2023 -</Text>
      </View>
    </View>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Changed background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  welcomeText: {
    marginTop: 25,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A4161A', // Changed text color
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A4161A', // Changed button color
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%', // Button takes full width
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: '#A4161A',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default HomeHospital;
