import React, { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useHospitalContext } from './HospitalContext'; // Importamos el contexto
const API_URL = "http://localhost:3000";

const getDistanceInKilometers = (lat1, lon1, lat2, lon2) => {
        const degreesToRadians = (degrees) => {
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

export const Hospitales = (props) => {
  const { setHospital } = useHospitalContext();
  const [position, setPosition] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hospitales, setHospitales] = useState([]);

  const requestBody = {
    tipoDonacion: props.route.params.tipoDonacion,
    tipoSangre: props.route.params.tipoSangre,
    factorRh: props.route.params.factorRh,
  };

  React.useEffect(() => {      
    fetchHospitales();
    handleGetCurrentPosition();
    obtenerHospitales();
  }, []);
    
  const handleGetCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos);
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, maximumAge: 100 }
      );
  };


   const obtenerHospitales = async () => {

      if (position && position.coords) {
        const hospitalsWithDistance = hospitales.map((hospital) => ({
          ...hospital,
          distance: getDistanceInKilometers(
            position.coords.latitude, position.coords.longitude,
            hospital.latitude,
            hospital.longitude
          ),
        }));
  
        const sortedHospitals = hospitalsWithDistance.sort((a,b) => a.distance - b.distance);
  
        setFilteredData(sortedHospitals);
      } else {
        console.log('No se ha obtenido la ubicación del usuario.'); }
  }

  const fetchHospitales = async () => {  
    try {
      let response = await fetch(`${API_URL}/hospital/getPedidosPorParametros/${props.user.user.id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }); 

      if (response.status === 404) {
        setErrorMessage("No hay pedidos disponibles con esta información.");
        setHospitales([]); 
        return;
      }
  
      if (!response.ok) {
        throw new Error("Error al obtener hospitales");
      }
  
      let hospitales = await response.json();
      setHospitales(hospitales);
      setErrorMessage("");

    } catch (error) {
      console.error("Error en fetching Hospitales: ", error);
    }
  };
  
  const handleHospitalPress = (hospital) => {
    setHospital(hospital);
    props.navigation.navigate('HospitalDonante', { pedidoHospital: hospital})
  };

  const renderItem = ({ item }) => {
    const donacionText =
      item.tipoDonacion === "Sangre"
        ? `Sangre: ${item.tipoSangre} ${item.factorRh}`
        : item.tipoDonacion;
  
    return (
      <TouchableOpacity onPress={() => handleHospitalPress(item)}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.hospital.nombre}</Text>
          <Text style={styles.itemPedido}>Tipo de Pedido: {donacionText}</Text>
          <Text style={styles.itemDescription}>{item.descripcion}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.columnContainer}>
            {hospitales.map((item) => (
              <View style={styles.columnItem} key={item.id}>
                <View style={styles.item}>
                  {renderItem({ item })}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A4161A'
  },
  itemPedido: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  itemDescription: {
    marginTop: 10,
    fontSize: 14,
    color: 'gray',
  },
  itemDistancia: {
    fontSize: 14,
    color: 'gray'
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Hospitales;