import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { format, parseISO } from 'date-fns';

const API_URL = "http://localhost:3000";

const HistorialTurnosHospital = (props) => {
  const [historialTurnosData, setHistorialTurnosData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getFormattedCurrentDate);
  const [selectedTurn, setSelectedTurn] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const formattedDate = selectedTurn && selectedTurn.fecha ? format(parseISO(selectedTurn.fecha), 'dd/MM/yyyy') : '';
  const formattedTime = selectedTurn ? selectedTurn.hora : '';

  useEffect(() => {
    // Obtener los turnos del hospital desde el servidor
    fetchTurnsFromServer();
  }, []);

  const getFormattedCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchTurnsFromServer = async () => {
    try {
      const response = await fetch(`${API_URL}/donante/getTurnosByHospitalId/${props.user.user.id}`);
      const data = await response.json();
      setHistorialTurnosData(data);
    } catch (error) {
      console.error('Error fetching hospital turns:', error);
    }
  };

  const openModal = (turno) => {
    setSelectedTurn(turno);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTurn(null);
    setModalVisible(false);
  };

  const items = historialTurnosData.reduce((result, turno) => {
    const date = turno.fecha.split('T')[0];
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(turno);
    return result;
  }, {});

  const markedDates = historialTurnosData.reduce((result, turno) => {
    const date = turno.fecha.split('T')[0];
    result[date] = { dotColor: 'red', marked: true };
    return result;
  }, {});

  const renderEmptyData = () => (
    <View style={styles.emptyDataContainer}>
      <Text style={styles.emptyDataText}>No hay turnos registrados</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historial de Turnos</Text>
      </View>
      <Agenda
        items={items}
        selected={selectedDate}
        pastScrollRange={3}
        futureScrollRange={3}
        renderItem={(item) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View key={item.id} style={styles.turnBlock}>
              <View style={styles.turnInfo}>
                <Text style={styles.turnText}>Paciente: {item.donante.nombre} {item.donante.apellido}</Text>
                <Text style={styles.turnText}>Donación: {item.pedidoHospital.tipoDonacion}</Text>
                <Text style={styles.turnText}>Hora: {item.hora}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderEmptyData={renderEmptyData}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDotColor: '#BA181B',
        }}
      />

      {/* Modal para mostrar la información detallada del turno */}
      <Modal 
        visible={isModalVisible} 
        style={styles.modal} 
        animationType="slide" 
        transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
            <ScrollView>
              <Text style={styles.modalTitle}>Información del Turno</Text>
              {/* Aquí puedes mostrar toda la información del donante */}
              {selectedTurn && (
                <View>
                  <Text style={styles.modalInfo}>Pedido n°{selectedTurn.pedidoHospital.id} - {selectedTurn.pedidoHospital.tipoDonacion}</Text>
                  <Text style={styles.modalInfo}>Fecha: {formattedDate} - {formattedTime}hs</Text>
                  <View>
                    <Text style={styles.modalInfoPacienteTitle}>Paciente</Text>

                    <Text style={styles.modalInfoPaciente}>Donante: {selectedTurn.donante.nombre} {selectedTurn.donante.apellido}</Text>
                    <Text style={styles.modalInfoPaciente}>DNI: {selectedTurn.donante.dni}</Text>
                    <Text style={styles.modalInfoPaciente}>Género: {selectedTurn.donante.genero}</Text> 
                    <Text style={styles.modalInfoPaciente}>Edad: {selectedTurn.donante.edad}</Text>
                    <Text style={styles.modalInfoPaciente}>Peso: {selectedTurn.donante.peso}kg</Text>
                    <Text style={styles.modalInfoPaciente}>Medicaciones: {selectedTurn.donante.medicaciones}</Text>
                    <Text style={styles.modalInfoPaciente}>Embarazo: {selectedTurn.donante.embarazo}</Text>
                    <Text style={styles.modalInfoPaciente}>Tipo de Sangre: {selectedTurn.donante.tipoSangre} {selectedTurn.donante.factorRH}</Text>
                  </View>
                  
                </View>
              )}
              <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseButtonText}>Cancelar Turno</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
      </Modal>

      
    </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'center',
    },
    headerTitle: {
      marginTop: 20,
      fontSize: 35,
      fontWeight: 'bold',
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
    emptyDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyDataText: {
      fontSize: 18,
      color: '#A4161A',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'white',
      margin: 30,
      marginTop: 110,
      marginBottom: 110,
      borderRadius: 10,
      padding: 35,
      color: 'black',
      borderColor: '#BA181B',  // Color del borde
      borderWidth: 2,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black',
    },
    modalInfo: {
      fontSize: 15,
      marginBottom: 5,
      color: 'black',
    },
    modalInfoPacienteTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      color: 'black',
    },
    modalInfoPaciente: {
      fontSize: 15,
      marginBottom: 5,
      color: 'black',
    },
    modalCloseButton: {
      backgroundColor: '#BA181B',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      alignItems: 'center',
    },
    modalCloseButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 10,
      zIndex: 1,
    },
    closeButtonText: {
      fontSize: 20,
      color: '#A4161A',
    },
  });
  
  export default HistorialTurnosHospital;