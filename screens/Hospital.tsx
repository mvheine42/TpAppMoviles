import React from 'react';
import { View, Text , Image, TouchableOpacity, StyleSheet} from 'react-native';
import { useHospitalContext } from './HospitalContext';

const Hospital = (props: any) => {
  const { selectedHospital } = useHospitalContext();

  if (!selectedHospital) {
    return <Text>No hay hospital seleccionado</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <Text style={styles.subtitle}>{selectedHospital.name}</Text>
      <Image
        source={require('./imagenes/Untitled.png')}
        style={styles.image}
      />
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
  }  
});

export default Hospital;
