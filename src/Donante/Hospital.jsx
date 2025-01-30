import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const Hospital = (props) => {

  const selectedPedidoHospital = props.route.params?.pedidoHospital
  const selectedHospital = props.route.params?.pedidoHospital.hospital;

  console.log('PedidoHospital: ' , selectedPedidoHospital);
  console.log('Hospital: ', selectedHospital);

  if (!selectedHospital) {
    return <Text>No hay hospital seleccionado</Text>;
  }

  const region = {
    latitude: selectedHospital.latitude,
    longitude: selectedHospital.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <Text style={styles.subtitle}>{selectedHospital.nombre}</Text>
      {/* 
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
      >
        <Marker 
          title={selectedHospital.name} 
          coordinate={{
            latitude: selectedHospital.latitude, 
            longitude: selectedHospital.longitude
          }} 
        />
      </MapView> 
      */}
      <View style={styles.informacion}>
        <Text style={styles.texto}>Dirección: {selectedHospital.provincia}, {selectedHospital.ciudad}, {selectedHospital.calle}, {selectedHospital.numero}</Text>
        <Text style={styles.texto}>Distancia: X kilómetros</Text>
        <Text style={styles.texto}> {selectedPedidoHospital.descripcion} </Text>
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
    width: '95%',
    height: '35%',
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 10,
  }  
});

export default Hospital;
