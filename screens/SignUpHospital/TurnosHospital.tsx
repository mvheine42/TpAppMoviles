import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'; // Importa la biblioteca para el modal

const backButtonImage = require('../imagenes/volver.png');
const trashImage = require('../imagenes/basura.png');

// Mock data for turns
const turnsData = [
  {
    id: 1,
    patient: 'Juan Perez',
    donation: 'Sangre A+',
    time: '10:00 AM',
  },
  {
    id: 2,
    patient: 'María García',
    donation: 'Plaquetas',
    time: '11:30 AM',
  },
  {
    id: 3,
    patient: 'Carlos Sánchez',
    donation: 'Sangre B-',
    time: '12:45 PM',
  },
  {
    id: 4,
    patient: 'Laura López',
    donation: 'Médula',
    time: '2:00 PM',
  },
  {
    id: 5,
    patient: 'Pedro Rodríguez',
    donation: 'Plaquetas',
    time: '3:15 PM',
  },
];

export const TurnosHospital = () => {
  const navigation = useNavigation();
  const [turns, setTurns] = useState(turnsData);
  const [selectedTurn, setSelectedTurn] = useState(null);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const openCalendar = () => {
    navigation.navigate('CalendarioHospital');
  };

  const openTurnsHistory = () => {
    console.log('Abrir historial de turnos');
  };

  const deleteTurn = (id) => {
    setSelectedTurn(id);
    setConfirmationVisible(true);
  };

  const confirmDeletion = () => {
    setTurns((prevTurns) => prevTurns.filter((turn) => turn.id !== selectedTurn));
    setSelectedTurn(null);
    setConfirmationVisible(false);
  };

  const cancelDeletion = () => {
    setSelectedTurn(null);
    setConfirmationVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={backButtonImage} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Turnos</Text>
      </View>

      <TouchableOpacity onPress={openCalendar} style={styles.button}>
        <Text style={styles.buttonText}>Calendario</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openTurnsHistory} style={styles.button}>
        <Text style={styles.buttonText}>Historial de turnos</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Turnos Hoy:</Text>

      <ScrollView>
        {turns.map((turn) => (
          <View key={turn.id} style={styles.turnBlock}>
            <View style={styles.turnInfo}>
              <Text style={styles.turnText}>Paciente: {turn.patient}</Text>
              <Text style={styles.turnText}>Donación: {turn.donation}</Text>
              <Text style={styles.turnText}>Hora: {turn.time}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteTurn(turn.id)} style={styles.trashButton}>
              <Image source={trashImage} style={styles.trashImage} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal isVisible={isConfirmationVisible}>
        <View style={styles.confirmationModal}>
          <Text style={styles.confirmationQuestion}>¿Estás seguro de eliminar este turno?</Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity onPress={cancelDeletion} style={styles.confirmationButton}>
              <Text style={styles.confirmationButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmDeletion} style={styles.confirmationButton}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#A4161A',
    marginTop: 10,
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#A4161A',
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
  confirmationText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#A4161A',
  },
  trashButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  trashImage: {
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

export default TurnosHospital;
