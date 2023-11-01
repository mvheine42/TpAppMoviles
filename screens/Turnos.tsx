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
  item: {
    backgroundColor: '#A4161A',
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
    color: 'white'
  },
  itemSubtitle: {
    fontSize: 16,
    color: 'white',
  },
  cancelButton: {
    color: 'white',
    fontSize: 16,
  },
});

export default Turnos;
