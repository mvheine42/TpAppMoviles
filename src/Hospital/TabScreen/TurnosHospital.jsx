import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

const trashImage = require('../../../imagenes/basura.png');

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
      const response = await fetch(`${API_URL}/donante/getTurnosByHospitalId/${props.userId.id}`);
      const data = await response.json();
      setTurns(data);
    } catch (error) {
      console.error('Error fetching turns:', error);
    }
  };

  const deleteTurn = (id) => {
    setSelectedTurn(id);
    setConfirmationVisible(true);
  };

  const confirmDeletion = async () => {
    try {
      // Hacer la solicitud DELETE a la API para eliminar el turno
      await fetch(`${API_URL}/donante/deleteTurno/${selectedTurn}`, {
        method: 'DELETE',
      });

      // Actualizar la lista de turnos llamando a fetchTurns nuevamente
      await fetchTurns();

      // Limpiar el estado local y cerrar el modal de confirmación
      setSelectedTurn(null);
      setConfirmationVisible(false);
    } catch (error) {
      console.error('Error deleting turn:', error);
      // Manejar el error aquí (por ejemplo, mostrar un mensaje al usuario)
    }
  };

  const cancelDeletion = () => {
    setSelectedTurn(null);
    setConfirmationVisible(false);
  };

  const todayTurns = turns.filter((turn) => turn.fecha.includes(getFormattedDate(0)));
  const tomorrowTurns = turns.filter((turn) => turn.fecha.includes(getFormattedDate(1)));
  const dayAfterTomorrowTurns = turns.filter((turn) => turn.fecha.includes(getFormattedDate(2)));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Turnos</Text>
      </View>

      <TouchableOpacity onPress={() => props.navigation.navigate('HistorialTurnosHospital')} style={styles.button}>
        <Text style={styles.buttonText}>Historial de turnos</Text>
      </TouchableOpacity>

      <ScrollView>
        <View>
          <Text style={styles.sectionTitle}>Hoy ({getFormattedDate(0)}):</Text>
          {todayTurns.map((turn) => (
            <View key={turn.id} style={styles.turnBlock}>
              <View style={styles.turnInfo}>
                <Text style={styles.turnText}>Paciente: {turn.donante.nombre} {turn.donante.apellido}</Text>
                <Text style={styles.turnText}>Nro de Pedido: {turn.pedidoHospital.id} {turn.pedidoHospital.tipoDonacion}</Text>
                <Text style={styles.turnText}>Hora: {turn.hora}hs</Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteTurn(turn.id)}
                style={styles.trashButton}
              >
                <Image source={trashImage} style={styles.trashImage} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>{getFormattedDate(1)}:</Text>
          {tomorrowTurns.map((turn) => (
            <View key={turn.id} style={styles.turnBlock}>
              <View style={styles.turnInfo}>
                <Text style={styles.turnText}>Paciente: {turn.donante.nombre} {turn.donante.apellido}</Text>
                <Text style={styles.turnText}>Nro de Pedido: {turn.pedidoHospital.id} {turn.pedidoHospital.tipoDonacion}</Text>
                <Text style={styles.turnText}>Hora: {turn.hora}hs</Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteTurn(turn.id)}
                style={styles.trashButton}
              >
                <Image source={trashImage} style={styles.trashImage} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>{getFormattedDate(2)}:</Text>
          {dayAfterTomorrowTurns.map((turn) => (
            <View key={turn.id} style={styles.turnBlock}>
              <View style={styles.turnInfo}>
                <Text style={styles.turnText}>Paciente: {turn.donante.nombre} {turn.donante.apellido}</Text>
                <Text style={styles.turnText}>Nro de Pedido: {turn.pedidoHospital.id} {turn.pedidoHospital.tipoDonacion}</Text>
                <Text style={styles.turnText}>Hora: {turn.hora}hs</Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteTurn(turn.id)}
                style={styles.trashButton}
              >
                <Image source={trashImage} style={styles.trashImage} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
    marginTop: 10,
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
