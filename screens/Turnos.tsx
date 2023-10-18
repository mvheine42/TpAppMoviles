import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

export const Turnos = (props: any) => {
  const [turnos, setTurnos] = useState([
    {
      id: '1',
      fecha: '2023-09-28',
      hora: '09:00 AM',
      dona: 'Sangre y Medula',
      tipo: 'A+',
      hospital: 'Hospital Fernandez'
    },
  ]);

  const [cancelItemId, setCancelItemId] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.fecha}</Text>
        <Text style={styles.itemSubtitle}>{item.hora}</Text>
        <Text style={styles.itemSubtitle}>{item.dona}</Text>
        <Text style={styles.itemSubtitle}>{item.tipo}</Text>
        <Text style={styles.itemSubtitle}>{item.hospital}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleCancel(item.id)}
      >
        <Text style={styles.cancelButton}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCancel = (itemId) => {
    Alert.alert(
      'Confirmar cancelación',
      '¿Estás seguro que deseas cancelar el turno?',
      [
        {
          text: 'Cancelar',
          onPress: () => setCancelItemId(null),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            // Elimina el elemento del array de turnos
            const updatedTurnos = turnos.filter(item => item.id !== itemId);
            setTurnos(updatedTurnos);
            setCancelItemId(null);
          },
        },
      ]
    );
    setCancelItemId(itemId);
  };

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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  cancelButton: {
    color: 'red',
    fontSize: 16,
  },
});

export default Turnos;
