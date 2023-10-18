import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const trashImage = require('../imagenes/basura.png');

const mockSolicitudesEnCurso = [
  { id: '1', tipo: 'Sangre A+', edadMinima: 18, edadMaxima: 60, tiempoExpiracion: 30 },
  { id: '2', tipo: 'Médula', edadMinima: 20, edadMaxima: 50, tiempoExpiracion: 15 },
  { id: '3', tipo: 'Sangre B-', edadMinima: 18, edadMaxima: 60, tiempoExpiracion: 25 },
  { id: '4', tipo: 'Plaquetas AB+', edadMinima: 25, edadMaxima: 65, tiempoExpiracion: 20 },
  { id: '5', tipo: 'Sangre O+', edadMinima: 20, edadMaxima: 50, tiempoExpiracion: 10 },
  { id: '6', tipo: 'Plaquetas A-', edadMinima: 30, edadMaxima: 70, tiempoExpiracion: 40 },
  { id: '7', tipo: 'Médula', edadMinima: 18, edadMaxima: 60, tiempoExpiracion: 35 },
  { id: '8', tipo: 'Sangre AB+', edadMinima: 25, edadMaxima: 65, tiempoExpiracion: 18 },
  { id: '9', tipo: 'Sangre B+', edadMinima: 20, edadMaxima: 50, tiempoExpiracion: 22 },
  { id: '10', tipo: 'Médula', edadMinima: 18, edadMaxima: 60, tiempoExpiracion: 30 },

];

export const PedidosEnCurso = () => {
  const [solicitudes, setSolicitudes] = useState(mockSolicitudesEnCurso);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const navigation = useNavigation();

  const cancelarSolicitud = (id) => {
    setSelectedSolicitud(id);
    setConfirmationVisible(true);
  };

  const confirmCancellation = () => {
    setSolicitudes((prevSolicitudes) => prevSolicitudes.filter((solicitud) => solicitud.id !== selectedSolicitud));
    setSelectedSolicitud(null);
    setConfirmationVisible(false);
  };

  const cancelCancellation = () => {
    setSelectedSolicitud(null);
    setConfirmationVisible(false);
  };

  const renderSolicitud = ({ item }) => {
    const { id, tipo, edadMinima, edadMaxima, tiempoExpiracion } = item;
    const titulo = `${id}: ${tipo}`;
    const tiempoExpiracionTexto = tiempoExpiracion > 1 ? 'meses' : 'mes';

    return (
      <View style={styles.solicitudContainer}>
        <View style={styles.solicitudInfo}>
          <Text style={styles.solicitudTitle}>{titulo}</Text>
          <TouchableOpacity onPress={() => cancelarSolicitud(id)}>
            <Image source={trashImage} style={styles.trashIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.solicitudText}>
          Edad mínima: {edadMinima} años
        </Text>
        <Text style={styles.solicitudText}>
          Edad máxima: {edadMaxima} años
        </Text>
        <Text style={styles.solicitudText}>
          Tiempo de expiración: {tiempoExpiracion} {tiempoExpiracionTexto}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes en Curso</Text>
      <FlatList
        data={solicitudes}
        keyExtractor={(item) => item.id}
        renderItem={renderSolicitud}
      />

      <Modal isVisible={isConfirmationVisible}>
        <View style={styles.confirmationModal}>
          <Text style={styles.confirmationQuestion}>¿Estás seguro de cancelar esta solicitud?</Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity onPress={cancelCancellation} style={styles.confirmationButton}>
              <Text style={styles.confirmationButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmCancellation} style={styles.confirmationButton}>
              <Text style={styles.confirmationButtonText}>Aceptar</Text>
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
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#A4161A',
  },
  backButton: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'left',
    position: 'absolute',
    left: 2,
    top: 10,
  },
  solicitudContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  solicitudInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  solicitudTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  solicitudText: {
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
  confirmationModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  confirmationQuestion: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmationButtonText: {
    fontSize: 20,
    color: '#A4161A',
    fontWeight: 'bold',
  },
});

export default PedidosEnCurso;
