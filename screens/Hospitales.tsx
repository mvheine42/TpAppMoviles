import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';

export const Hospitales = (props: any) => {
  const [userLocation, setUserLocation] = useState({ latitude: 40.7128, longitude: -74.0060 }); // Ubicación de Nueva York
  const [filteredData, setFilteredData] = useState([]); // Lista filtrada de hospitales por distancia

  const data = [
    {
      id: '1',
      name: 'Hospital A',
      address: 'Dirección A',
      description: 'Descripción del Hospital A',
      latitude: 40.7128, // Latitud del Hospital A
      longitude: -74.0060, // Longitud del Hospital A
    },
    {
      id: '2',
      name: 'Hospital B',
      address: 'Dirección B',
      description: 'Descripción del Hospital B',
      latitude: 40.7219, // Latitud del Hospital B
      longitude: -73.9977, // Longitud del Hospital B
    },
    // Agrega más hospitales con ubicaciones ficticias...
  ];

 // ...

useEffect(() => {
  // Función para calcular la distancia entre dos puntos en coordenadas geográficas en kilómetros
  const getDistanceInKilometers = (lat1, lon1, lat2, lon2) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const radlon1 = (Math.PI * lon1) / 180;
    const radlon2 = (Math.PI * lon2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.60934; // En kilómetros
    return dist;
  };

  // Calcular la distancia y ordenar hospitales por distancia
  const hospitalsWithDistance = data.map((hospital) => ({
    ...hospital,
    distance: getDistanceInKilometers(
      userLocation.latitude,
      userLocation.longitude,
      hospital.latitude,
      hospital.longitude
    ),
  }));

  const sortedHospitals = hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

  setFilteredData(sortedHospitals);
}, [userLocation]);

// ...

const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => props.navigation.navigate('Hospital')}>
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemAddress}>{item.address}</Text>
      <ScrollView style={styles.itemDescriptionContainer}>
        <Text style={styles.itemDescription}>{item.description}</Text>
        {item.distance !== undefined && (
          <Text style={styles.itemDescription}>Distancia: {item.distance.toFixed(2)} kilómetros</Text>
        )}
      </ScrollView>
    </View>
  </TouchableOpacity>
);

return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>DonaVida+</Text>
    </View>
    <View style={styles.columnContainer}>
      {filteredData.map((item) => (
        <View style={styles.columnItem} key={item.id}>
          {renderItem({ item })}
        </View>
      ))}
    </View>
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
  columnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 10,
  },
  columnItem: {
    width: '48%', // Ajusta este valor según tus necesidades para dos columnas
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemAddress: {
    fontSize: 16,
    color: 'gray',
  },
  itemDescriptionContainer: {
    marginTop: 10,
    maxHeight: 100,
  },
  itemDescription: {
    fontSize: 14,
  },
});


export default Hospitales;
