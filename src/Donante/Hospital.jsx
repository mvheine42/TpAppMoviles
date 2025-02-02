import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useEffect, useState } from 'react';


const Hospital = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  const selectedPedidoHospital = props.route.params?.pedidoHospital;
  const selectedHospital = props.route.params?.pedidoHospital.hospital;
  const donacion = props.route.params?.pedidoHospital.tipoDonacion + ': ' + props.route.params?.pedidoHospital.tipoSangre + ' ' + props.route.params?.pedidoHospital.factorRh;

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ latitude, longitude });

              const dist = calcularDistancia(
                latitude,
                longitude,
                parseFloat(selectedHospital.latitude),
                parseFloat(selectedHospital.longitude)
              );
              setDistance(dist.toFixed(2)); // Show 2 decimal places
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          console.log('Location permission denied');
        }
      })
      .catch((error) => console.log('Permission error:', error));
  }, []);

  if (!selectedHospital) {
    return <Text>No hay hospital seleccionado</Text>;
  }

  const initialRegion = {
    latitude: parseFloat(selectedHospital.latitude),
    longitude: parseFloat(selectedHospital.longitude),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
    const EARTH_RADIUS = 6371; // km
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLon / 2) ** 2 * Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <Text style={styles.subtitle}>{selectedHospital.nombre}</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        <Marker
          title={selectedHospital.nombre}
          coordinate={{
            latitude: parseFloat(selectedHospital.latitude),
            longitude: parseFloat(selectedHospital.longitude),
          }}
        />
      </MapView>
      <View style={styles.informacion}>
        <Text style={styles.texto}>{selectedHospital.provincia}, {selectedHospital.ciudad}, {selectedHospital.calle}, {selectedHospital.numero}</Text>
        <Text style={styles.texto}>
          Distancia: {distance ? `${distance} km` : 'Calculando...'}
        </Text>
      </View>
      <View style={styles.infoPedido}>
        <Text style={styles.textoPedido}>Donacion para: 
                  {selectedPedidoHospital.tipoDonacion === 'Sangre' 
                    ? `  ${selectedPedidoHospital.tipoDonacion}: ${selectedPedidoHospital.tipoSangre} ${selectedPedidoHospital.factorRh}` 
                    : selectedPedidoHospital.tipoDonacion}
        </Text>
        <Text style={styles.textoPedido}>{selectedPedidoHospital.descripcion}</Text>
      </View>
      <TouchableOpacity
        style={styles.donarButton}
        onPress={() =>
          props.navigation.navigate('QuieroDonar', {
            hospital: selectedHospital,
            idPedidoHospital: selectedPedidoHospital.id,
            tipoDonacion: donacion,
          })
        }
      >
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
    alignItems: 'left',
  },
  texto: {
    marginBottom: 5,
    fontSize: 16,
    color: 'grey',
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  infoPedido: {
    padding: 2,
    alignItems: 'center',
    marginTop: 10,
  },
  textoPedido: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 19,
    color: 'black',
    justifyContent: 'center',
  },
  map: {
    width: '93%',
    height: '40%',
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 10,
  }  
});

export default Hospital;
