import React, { useState, useEffect } from 'react';
import { View, Text , Image, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useHospitalContext } from './HospitalContext';
import Geolocation from '@react-native-community/geolocation';


const Hospital = (props: any) => {
  const { selectedHospital } = useHospitalContext();
  const [position, setPosition] = useState(null);
  const [region, setRegion] = React.useState({latitude: selectedHospital.latitude,
    longitude: selectedHospital.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121})

  if (!selectedHospital) {
    return <Text>No hay hospital seleccionado</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <Text style={styles.subtitle}>{selectedHospital.name}</Text>
      <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       initialRegion={region}>
        <Marker title = {selectedHospital.name} coordinate={{latitude: selectedHospital.latitude, longitude: selectedHospital.longitude}}></Marker>
      </MapView>
      <View style={styles.informacion}>
        <Text style={styles.texto}>Dirección: {selectedHospital.address}</Text>
        <Text style={styles.texto}>Distancia: {selectedHospital.distance.toFixed(2)} kilómetros</Text>
        <Text style={styles.texto}>Buscamos donantes de: Sangre 0+</Text>
      </View>
      <TouchableOpacity style={styles.donarButton} onPress={() => props.navigation.navigate('QuieroDonar')}>
        <Text style={styles.donarButtonText}>Quiero donar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '14%',
    backgroundColor: 'rgb(245, 243, 244)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    position: 'relative',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
    textShadowColor: '#A4161A',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: '85%',
    height: '35%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  donarButton: {
    backgroundColor: '#A4161A',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  donarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  informacion:{
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    color: 'grey',
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  map: {
  height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
  }  
});

export default Hospital;
