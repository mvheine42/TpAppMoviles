import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export const Turnos = (props: any) => {
  const [turnos] = useState([
    {
      id: '1',
      fecha: '2023-09-28',
      hora: '09:00 AM',
      dona: 'Sangre y Medula',
      tipo: 'A+',
      hospital: 'Hospital Fernandez'
    },
    {
        id: '2',
        fecha: '2023-09-28',
        hora: '09:00 AM',
        dona: 'Sangre y Medula',
        tipo: '0-',
        hospital: 'Hospital Fernandez'
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
      }}
    >
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.fecha}</Text>
        <Text style={styles.itemSubtitle}>{item.hora}</Text>
        <Text style={styles.itemSubtitle}>{item.dona}</Text>
        <Text style={styles.itemSubtitle}>{item.tipo}</Text>
        <Text style={styles.itemSubtitle}>{item.hospital}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <FlatList
        data={turnos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'rgb(229, 56, 59)',
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Turnos;
