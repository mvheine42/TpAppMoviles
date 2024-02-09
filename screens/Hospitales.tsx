import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useHospitalContext } from './HospitalContext';

const fetchHospitales = async () => {
  try {
    const response = await fetch(
      'https://cdn.buenosaires.gob.ar/datosabiertos/datasets/ministerio-de-salud/hospitales/hospitales.geojson'
    );

    if (!response.ok) {
      throw new Error('Error al obtener la información de hospitales');
    }

    const data = await response.json();

    if (data && data.features) {
      const hospitalesData = data.features.map((feature: { properties: { ID: any; NOMBRE: any; DOM_NORMA: any; TELEFONO: any; }; geometry: { coordinates: any; }; }) => {
        const { ID, NOMBRE, DOM_NORMA, TELEFONO } = feature.properties;
        const { coordinates } = feature.geometry;
        const [longitude, latitude] = coordinates;

        return {
          id: ID,
          name: NOMBRE,
          address: DOM_NORMA,
          telephone: TELEFONO,
          latitude,
          longitude,
        };
      });

      return hospitalesData;
    } else {
      console.error('La respuesta no contiene datos válidos');
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const getDistanceInKilometers = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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

export const Hospitales = (props: any) => {
  const [userLocation, setUserLocation] = useState({ latitude: 40.7128, longitude: -74.0060 });
  const [filteredData, setFilteredData] = useState([]); // Lista filtrada de hospitales por distancia
  const [hospitales, setHospitales] = useState([]);
  const { setHospital } = useHospitalContext(); 
  

  useEffect(() => {
    const obtenerHospitales = async () => {
      const hospitalesData = await fetchHospitales();
      setHospitales(hospitalesData);

      // Imprime la información de los hospitales por consola
      console.log('Hospitales:', hospitalesData);

      // Calcular la distancia y ordenar hospitales por distancia
      const hospitalsWithDistance = hospitalesData.map((hospital: { latitude: any; longitude: any; }) => ({
        ...hospital,
        distance: getDistanceInKilometers(
          userLocation.latitude,
          userLocation.longitude,
          hospital.latitude,
          hospital.longitude
        ),
      }));

      const sortedHospitals = hospitalsWithDistance.sort((a: { distance: number; }, b: { distance: number; }) => a.distance - b.distance);

      setFilteredData(sortedHospitals);
    };

    obtenerHospitales();
  }, [userLocation]);

  const handleHospitalPress = (hospital: any) => {
    setHospital(hospital); // Almacena el hospital seleccionado en el contexto
    props.navigation.navigate('HospitalParaDonar'); // Navega a la pantalla del hospital
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleHospitalPress(item)}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemAddress}>{item.address}</Text>
        <Text style={styles.itemDistancia}>Distancia: {item.distance.toFixed(2)} kilómetros</Text>
      </View>
    </TouchableOpacity>
  );  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <ScrollView>
        <View style={styles.columnContainer}>
          {filteredData.map((item) => (
            <View style={styles.columnItem} key={item.id}>
              <View style={styles.item}>
                {renderItem({ item })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    margin: 10,
  },
  columnItem: {
    marginBottom: 15,
    width: '95%',
    alignSelf: 'center',
  },
  item: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A4161A'
  },
  itemAddress: {
    marginTop:10,
    fontSize: 16,
    color: 'gray',
  },
  itemDescriptionContainer: {
    marginTop: 10,
    maxHeight: 100,
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray'
  },
  itemDistancia: {
    fontSize: 14,
    color: 'gray'
  },
});


export default Hospitales;
