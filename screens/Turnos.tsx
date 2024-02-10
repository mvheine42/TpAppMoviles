
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useHospitalContext } from './HospitalContext';

export const Turnos = (props: any) => {


  const [region, setRegion] = React.useState({latitude:0,
    longitude:0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121})

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

  const openTurnDetails = (item) => {
    setSelectedTurn(item);
    };

  const closeTurnDetails = () => {
    setSelectedTurn(null);
  };

  const [selectedTurn, setSelectedTurn] = useState(null);

  const [cancelItemId, setCancelItemId] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => openTurnDetails(item)}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.fecha}</Text>
          <Text style={styles.itemSubtitle}>{item.hora}</Text>
          <Text style={styles.itemSubtitle}>{item.dona}</Text>
          <Text style={styles.itemSubtitle}>{item.tipo}</Text>
          <Text style={styles.itemSubtitle}>{item.hospital}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCancel(item.id)}>
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
      <Modal visible={selectedTurn !== null} animationType="slide" transparent>
      <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>{selectedTurn?.hospital}</Text>
            <Text>Fecha: {selectedTurn?.fecha}</Text>
            <Text>Hora: {selectedTurn?.hora}</Text>
            <Text>Dona: {selectedTurn?.dona}</Text>
            <Text>Tipo: {selectedTurn?.tipo}</Text>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={region}></MapView>
            <TouchableOpacity onPress={closeTurnDetails}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  map: {
    width: '100%',
    height: '60%',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    height: '50%',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'right',
  },
});

export default Turnos;
