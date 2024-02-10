import React, { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
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
        const degreesToRadians = (degrees: number) => {
          return degrees * (Math.PI / 180);
      }

      const EARTH_RADIUS = 6371; // Radio de la Tierra en kilómetros

      const dLat = degreesToRadians(lat2 - lat1);
      const dLon = degreesToRadians(lon2 - lon1);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * 
                Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2));

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distancia = EARTH_RADIUS * c; // Distancia en kilómetros

      return distancia;
};

export const Hospitales = (props: any) => {
  const [position, setPosition] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Lista filtrada de hospitales por distancia
  const [hospitales, setHospitales] = useState([]);
  const { setHospital } = useHospitalContext(); 

  useEffect(() => {
    const handleGetCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        (pos) => {
          console.log(pos);
          setPosition(pos);
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, maximumAge: 100 }
      );
    };

    handleGetCurrentPosition();

  }, []); // Se ejecuta solo al montar el componente
  

  useEffect(() => {
    const obtenerHospitales = async () => {
      const hospitalesData = await fetchHospitales();
      setHospitales(hospitalesData);

      // Imprime la información de los hospitales por consola
      console.log('Hospitales:', hospitalesData);

      if (position && position.coords) {
        // Calcular la distancia y ordenar hospitales por distancia
        const hospitalsWithDistance = hospitalesData.map((hospital: { latitude: any; longitude: any; }) => ({
          ...hospital,
          distance: getDistanceInKilometers(
            position.coords.latitude, position.coords.longitude,
            hospital.latitude,
            hospital.longitude
          ),
        }));
  
        const sortedHospitals = hospitalsWithDistance.sort((a: { distance: number; }, b: { distance: number; }) => a.distance - b.distance);
  
        setFilteredData(sortedHospitals);
      } else {
        console.log('No se ha obtenido la ubicación del usuario.'); }}

    obtenerHospitales();
  }, [position]);

  const handleHospitalPress = (hospital: any) => {
    setHospital(hospital); // Almacena el hospital seleccionado en el contexto
    props.navigation.navigate('HospitalParaDonar'); // Navega a la pantalla del hospital
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleHospitalPress(item)}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemAddress}>{item.address}</Text>
        <Text style={styles.itemDistancia}>Distancia: {item.distance.toFixed(0)} kilómetros</Text>
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
