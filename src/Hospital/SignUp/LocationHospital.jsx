import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';

const ubicacionImage = require('../../../imagenes/ubicacion.png');

export const LocationHospital = (props) => {
  const userInfo = props.route.params.usuarioData;

  const [pais, setPais] = useState('');
  const [provincia, setProvincia] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const handleContinue = () => {
    const usuarioData = {
      userInfo,
      pais,
      provincia,
      ciudad,
      calle,
      numero,
      longitude,
      latitude
    };
    props.navigation.navigate('VerificacionDeDatosHospital', { usuarioData });
  };

  const isFormComplete = () => {
    return pais && provincia && ciudad && calle && numero;
  };

  const fetchCoordinates = async () => {
    const address = `${calle} ${numero}, ${ciudad}, ${provincia}, ${pais}`;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLongitude(lon);
        setLatitude(lat);
      } else {
        Alert.alert('Error', 'No se pudo obtener la ubicación. Verifica la dirección.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al obtener la ubicación.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Ubicación</Text>

      <View style={styles.block}>
        <Image source={ubicacionImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Pais"
          placeholderTextColor="white"
          onChangeText={setPais}
        />
      </View>

      <View style={styles.block}>
        <Image source={ubicacionImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Provincia"
          placeholderTextColor="white"
          onChangeText={setProvincia}
        />
      </View>

      <View style={styles.block}>
        <Image source={ubicacionImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          placeholderTextColor="white"
          onChangeText={setCiudad}
        />
      </View>

      <View style={styles.block}>
        <Image source={ubicacionImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Calle"
          placeholderTextColor="white"
          onChangeText={setCalle}
        />
      </View>

      <View style={styles.block}>
        <Image source={ubicacionImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Numero"
          keyboardType="numeric"
          placeholderTextColor="white"
          onChangeText={setNumero}
        />
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={[styles.continueButton, !isFormComplete() && styles.disabledButton]}
        disabled={!isFormComplete()}
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
  },
  mapButton: {
    backgroundColor: '#BA181B',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    width: 270,
    alignSelf: 'center',
    marginTop: 15,
  },
  mapContainer: {
    marginTop: 20,
    height: 300,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  }
});

export default LocationHospital;