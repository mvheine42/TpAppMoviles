import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
  const [region, setRegion] = useState(null);
  const [locationError, setLocationError] = useState(false);

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (isFormComplete()) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        fetchCoordinates();
      }, 1000);
    }
  }, [pais, provincia, ciudad, calle, numero]);

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
    const formattedAddress = encodeURIComponent(address);
    const apiKey = `AIzaSyAPYG0ejrPF7v9yxjxc9C5O0-0zfoB1SGM`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);

        setRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        setLocationError(false);
      } else {
        setLocationError(true);
        setLatitude(null);
        setLongitude(null);
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setLocationError(true);
    }
  };

  const handleTextInputChange = (text) => {};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Ubicación</Text>

      {['Pais', 'Provincia', 'Ciudad', 'Calle', 'Numero'].map((placeholder, index) => (
        <View style={styles.block} key={index}>
          <Image source={ubicacionImage} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="white"
            onChangeText={(text) => {
              if (placeholder === 'Pais') setPais(text);
              else if (placeholder === 'Provincia') setProvincia(text);
              else if (placeholder === 'Ciudad') setCiudad(text);
              else if (placeholder === 'Calle') setCalle(text);
              else setNumero(text.replace(/[^0-9]/g, ''));
              handleTextInputChange(text);
            }}
            keyboardType={placeholder === 'Numero' ? 'numeric' : 'default'}
            value={placeholder === 'Numero' ? numero : undefined}
          />
        </View>
      ))}

      {locationError && (
        <Text style={styles.errorText}>No location found</Text>
      )}
      {latitude && longitude && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
          >
            <Marker coordinate={{ latitude, longitude }} title="Ubicación del hospital" />
          </MapView>
        </View>
      )}

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
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LocationHospital;
