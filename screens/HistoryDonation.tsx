import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HistoryDonation = () => {
  const [donations, setDonations] = useState([
    { id: 1, bloodType: 'O+', date: '2023-10-31', hospital: 'Hospital A' },
    { id: 2, bloodType: 'A-', date: '2023-10-30', hospital: 'Hospital B' },
    { id: 3, bloodType: 'A-', date: '2023-10-30', hospital: 'Hospital B' },
    { id: 4, bloodType: 'A-', date: '2023-10-30', hospital: 'Hospital B' },
    // Puedes agregar más donaciones aquí
  ]);

  const [benefits, setBenefits] = useState([
    { id: 1, location: 'Restaurante X' },
    { id: 2, location: 'Gimnasio Y' },
    { id: 3, location: 'Gimnasio Y' },
    { id: 4, location: 'Gimnasio Y' },
    // Puedes agregar más beneficios aquí
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
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
            </View>
          )}
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>Beneficios</Text>
        <FlatList
          data={benefits}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.box}>
              <Text>Lugar: {item.location}</Text>
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
    padding: 16,
  },
  topSection: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#000',
  },
  bottomSection: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  box: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    margin: 10,
  },
});

export default HistoryDonation;
