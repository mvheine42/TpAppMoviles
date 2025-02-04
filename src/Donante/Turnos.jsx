
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';

const API_URL = "http://localhost:3000";

export const Turnos = (props) => {
  const [selectedTurn, setSelectedTurn] = useState(null);
  const [cancelItemId, setCancelItemId] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [selectedPedidoHospital, setSelectedPedidoHospital] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
    
  
  useFocusEffect(
    React.useCallback(() => {
      fetchTurnos();
    }, [])
  );
  

  const fetchTurnos = async () => {
    let turnos = await fetch(`${API_URL}/donante/getTurnosById/${props.user.user.id}`);
    turnos = await turnos.json();
    setTurnos(turnos);
  }

  function formatFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    
    const fechaFormateada = fecha.toISOString().split('T')[0].replace(/-/g, '/');

    const horaFormateada = fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  
    return `${fechaFormateada} - ${horaFormateada}`;
  }

  const [region, setRegion] = React.useState({latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121})

    useEffect(() => {
      if (latitude !== null && longitude !== null) {
        setRegion({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      }
    }, [latitude, longitude]);
    

  const openTurnDetails = (item) => {
    setSelectedTurn(item);
    setSelectedPedidoHospital(item.pedidoHospital);
    setSelectedHospital(item.pedidoHospital.hospital);
    const lat = item.pedidoHospital.hospital.latitude;
    const lon = item.pedidoHospital.hospital.longitude;
    setLatitude(lat);
    setLongitude(lon);
  };

  const closeTurnDetails = () => {
    setSelectedTurn(null);
    setSelectedPedidoHospital(null);
    setSelectedHospital(null);
  };

  const renderItem = ({ item }) => {
    const tipoDonacion =
      item.pedidoHospital.tipoDonacion === "Sangre"
        ? `${item.pedidoHospital.tipoDonacion} - ${item.pedidoHospital.tipoSangre} ${item.pedidoHospital.factorRh}`
        : item.pedidoHospital.tipoDonacion;
  
    const isDisabled = item.assisted !== "";
  
    const itemStyle = {
      ...styles.item,
      backgroundColor: isDisabled ? "#B0B0B0" : "#A4161A",
    };
  

    let asistenciaText = "";
    let asistenciaColor = "transparent"; // Oculto por defecto
  
    if (item.assisted === "true") {
      asistenciaText = "Asistió";
      asistenciaColor = "green";
    } else if (item.assisted === "false") {
      asistenciaText = "No asistió";
      asistenciaColor = "#555555"; // Gris oscuro
    }
  
    return (
      <TouchableOpacity 
        style={itemStyle} 
        onPress={() => openTurnDetails(item)} 
        disabled={isDisabled}
      >
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{formatFecha(item.fecha)}hs</Text>
          <Text style={styles.itemSubtitle}>Dona: {tipoDonacion}</Text>
          <Text style={styles.itemSubtitle}>En: {item.pedidoHospital.hospital.nombre}</Text>
        </View>
    
        {!isDisabled && (
          <TouchableOpacity onPress={() => handleCancel(item.id)}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
        )}
    
        {asistenciaText !== "" && (
          <Text style={{ ...styles.assistenciaText, color: asistenciaColor }}>
            {asistenciaText}
          </Text>
        )}
      </TouchableOpacity>
    );
    
  };
  
  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/donante/deleteTurno/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el turno');
      }
  
      const result = response.status === 204 ? { success: true } : await response.json();
  
      if (result.success) {
        console.log('Turno eliminado con éxito:', result.message);
        fetchTurnos();
      } else {
        console.log('Error:', result.message);
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE:', error);
    }
  };
  

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
            deleteItem(itemId);
          },
        }
      ]
  )}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <FlatList data={turnos} renderItem={renderItem} keyExtractor={(item) => item.id}/>
      <Modal visible={selectedTurn !== null} animationType="slide" transparent>
      <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>{selectedHospital?.nombre}</Text>
            <Text style={styles.modalInfo}>Fecha: {selectedTurn ? formatFecha(selectedTurn.fecha) : "N/A"}hs</Text>
            <Text style={styles.modalInfo}>Dona: {selectedTurn?.pedidoHospital.tipoDonacion}</Text>
            {latitude !== null && longitude !== null && (
              <MapView 
                provider={PROVIDER_GOOGLE} 
                style={styles.map} 
                initialRegion={region}
              >
                <Marker coordinate={region} title={selectedTurn?.hospital} />
              </MapView>
            )}
            <Text style={styles.modalDirec}>{selectedHospital?.calle} {selectedHospital?.numero}, {selectedHospital?.ciudad}, {selectedHospital?.provincia}, {selectedHospital?.pais}</Text>
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
    textShadowRadius: 4
  },
  item: {
    backgroundColor: '#A4161A',
    padding: 25,
    marginTop: 15,
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
    color: 'white',
    marginBottom: 15
  },
  itemSubtitle: {
    marginTop: 3,
    fontSize: 16,
    color: 'white',
  },
  cancelButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold",    
  },
  assistenciaText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    width: '100%',
    height: '65%',
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
    width: '85%',
    height: '65%',
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 18,
    marginBottom: 2,
  },
  modalDirec: {
    fontSize: 14,
    marginTop: 2,
  },
  closeButton: {
    fontSize: 18,
    color: 'blue',
    marginTop: 20,
    textAlign: 'right',
  },
});

export default Turnos;
