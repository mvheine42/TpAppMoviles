import React, { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useHospitalContext } from './HospitalContext';

const API_URL = "http://localhost:3000";

const getDistanceInKilometers = (lat1, lon1, lat2, lon2) => {
  const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
  const EARTH_RADIUS = 6371;
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
};

export const Hospitales = (props) => {
  const { setHospital } = useHospitalContext();
  const [position, setPosition] = useState(null);
  const [hospitales, setHospitales] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const requestBody = {
    tipoDonacion: props.route.params.tipoDonacion,
    tipoSangre: props.route.params.tipoSangre,
    factorRh: props.route.params.factorRh,
  };

  useEffect(() => {
    handleGetCurrentPosition();
  }, []);

  const handleGetCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
        fetchHospitales(pos);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
  };

  const fetchHospitales = async (pos) => {
    try {
      const response = await fetch(`${API_URL}/hospital/getPedidosPorParametros/${props.user.user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 404) {
        setErrorMessage("No hay pedidos disponibles con esta información.");
        setHospitales([]);
        setLoading(false);
        return;
      }

      if (!response.ok) throw new Error("Error al obtener hospitales");

      let hospitales = await response.json();

      if (pos && pos.coords) {
        hospitales = hospitales.map((hospital) => ({
          ...hospital,
          distance: getDistanceInKilometers(
            pos.coords.latitude,
            pos.coords.longitude,
            parseFloat(hospital.hospital.latitude),
            parseFloat(hospital.hospital.longitude)
          ).toFixed(2),
        })).sort((a, b) => a.distance - b.distance);
      }

      setHospitales(hospitales);
      setErrorMessage("");
    } catch (error) {
      console.error("Error en fetching Hospitales: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalPress = (hospital) => {
    setHospital(hospital);
    props.navigation.navigate('HospitalDonante', { pedidoHospital: hospital });
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
              <TouchableOpacity key={item.id} onPress={() => handleHospitalPress(item)}>
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>{item.hospital.nombre}</Text>
                  <Text style={styles.itemPedido}>
                    Tipo de Pedido: {item.tipoDonacion === "Sangre" ? `Sangre: ${item.tipoSangre} ${item.factorRh}` : item.tipoDonacion}
                  </Text>
                  <Text style={styles.itemDescription}>{item.descripcion}</Text>
                  <Text style={styles.itemDistancia}>Distancia: {item.distance} km</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  columnContainer: {
    margin: 10,
  },
  item: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A4161A',
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
    marginTop: 5,
    fontSize: 14,
    color: '#555',
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Hospitales;
