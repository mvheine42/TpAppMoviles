import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const HistoryDonation = () => {
  const [donations, setDonations] = useState([
    { id: 1, bloodType: 'O+', date: '2023-10-31', hospital: 'Hospital A', image: require('./imagenes/gota-de-sangre.png')},
    { id: 2, bloodType: 'A-', date: '2023-10-30', hospital: 'Hospital B', image: require('./imagenes/gota-de-sangre.png')},
    { id: 3, bloodType: 'A-', date: '2023-10-30', hospital: 'Hospital B', image: require('./imagenes/gota-de-sangre.png')},
    { id: 4, bloodType: 'A-', date: '2023-10-30', hospital: 'Hospital B', image: require('./imagenes/gota-de-sangre.png')},
    // Puedes agregar más donaciones aquí
  ]);

  const [benefits, setBenefits] = useState([
    { id: 1, location: 'La Parolaccia', image: require('./imagenes/468c5d82ce5a6d1c23a90a3c3a6c0996.jpg') },
    { id: 2, location: 'Gimnasio Y' },
    { id: 3, location: 'Gimnasio Y' },
    { id: 4, location: 'Gimnasio Y' },
    // Puedes agregar más beneficios aquí
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Donaciones</Text>
        <FlatList
          data={donations}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.box}>
              <Text>Tipo de Sangre: {item.bloodType}</Text>
              <Text>Fecha: {item.date}</Text>
              <Text>Hospital: {item.hospital}</Text>
              <Image source={item.image} style={styles.image} />
            </View>
          )}/>
        <Text style={styles.sectionTitle}>Beneficios</Text>
        <FlatList
          data={benefits}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.box}>
              <Text> {item.location}</Text>
              <Image source={item.image} style={styles.image} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    flex: 1,
    alignItems: 'flex-start', // Alinear en la parte superior
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    margin: 5,
    borderRadius: 3,
    height: '80%',
    alignSelf: 'center',
    alignContent: 'flex-start',
  },
  image: {
    width: 100, 
    height: 100, 
    resizeMode: 'cover', 
    alignSelf: 'center',
  },  
});

export default HistoryDonation;
