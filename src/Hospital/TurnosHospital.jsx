import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

const checkImage = require('../../imagenes/icons8-check-100.png');

const API_URL = "http://localhost:3000";

const getFormattedDate = (offset) => {
  const today = new Date();
  today.setDate(today.getDate() + offset);
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const TurnosHospital = (props) => {
  const [turns, setTurns] = useState([]);
  const [selectedTurn, setSelectedTurn] = useState(null);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  useEffect(() => {
    fetchTurns();
  }, []);

  const fetchTurns = async () => {
    try {
      const response = await fetch(`${API_URL}/donante/getTurnosByHospitalIdAssisted/${props.user.user.id}`);
      const data = await response.json();
      setTurns(data);
    } catch (error) {
      console.error('Error fetching turns:', error);
    }
  };

  const confirmAttendance = (id) => {
    setSelectedTurn(id);
    setConfirmationVisible(true);
  };

  const handleConfirmAttendance = async (confirmed) => {
    try {
      const assistedValue = confirmed ? "true" : "false";
      await fetch(`${API_URL}/donante/updateAttendance/${selectedTurn}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assisted: assistedValue }),
      });
      setTurns((prevTurns) => prevTurns.filter((turn) => turn.id !== selectedTurn));
      setSelectedTurn(null);
      setConfirmationVisible(false);
    } catch (error) {
      console.error(`Error updating attendance:`, error);
    }
  };

  const cancelConfirmation = () => {
    setSelectedTurn(null);
    setConfirmationVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Turnos</Text>
      </View>

      <TouchableOpacity onPress={() => props.navigation.navigate('HistorialTurnosHospital')} style={styles.button}>
        <Text style={styles.buttonText}>Historial de turnos</Text>
      </TouchableOpacity>

      <ScrollView>
        {turns.length > 0 ? (
          <Text>Turnos pendientes de confirmación</Text>,
          turns.map((turn) => (
            <View key={turn.id} style={styles.turnBlock}>
              <View style={styles.turnInfo}>
                <Text style={styles.turnText}>Paciente: {turn.donante.nombre} {turn.donante.apellido}</Text>
                <Text style={styles.turnText}>Nro de Pedido: {turn.pedidoHospital.id} {turn.pedidoHospital.tipoDonacion}</Text>
                <Text style={styles.turnText}>Fecha: {turn.fecha}</Text>
                <Text style={styles.turnText}>Hora: {turn.hora}hs</Text>
              </View>
              <TouchableOpacity
                onPress={() => confirmAttendance(turn.id)}
                style={styles.checkButton}
              >
                <Image source={checkImage} style={styles.checkImage} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.noTurnsContainer}>
            <Text style={styles.noTurnsText}>No hay turnos pendientes de confirmación</Text>
          </View>
        )}
      </ScrollView>

      <Modal isVisible={isConfirmationVisible}>
        <View style={styles.confirmationModal}>
          <Text style={styles.confirmationQuestion}>¿Confirmar asistencia del donante?</Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity onPress={cancelConfirmation} style={styles.confirmationButton}>
              <Text style={styles.confirmationButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleConfirmAttendance(false)} style={styles.confirmationButton}>
              <Text style={styles.confirmationButtonText}>No Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleConfirmAttendance(true)} style={styles.confirmationButton}>
              <Text style={styles.confirmationButtonText}>Confirmar</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#A4161A',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#A4161A',
  },
  button: {
    backgroundColor: '#A4161A',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  turnBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  turnInfo: {
    flex: 1,
  },
  turnText: {
    fontSize: 18,
    color: '#A4161A',
  },
  checkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  checkImage: {
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
    paddingHorizontal: 5,
  },
  confirmationButtonText: {
    fontSize: 17,
    color: '#A4161A',
    fontWeight: 'bold',
  },
});

export default TurnosHospital;
