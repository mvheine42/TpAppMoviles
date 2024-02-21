import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';

const API_URL = "http://localhost:3000";

export const HistorialTurnosHospital = (props) => {
  const [historialTurnosData, setHistorialTurnosData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getFormattedCurrentDate);

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
      const response = await fetch(`${API_URL}/donante/getTurnosByHospitalId/${props.userId.id}`);
      const data = await response.json();
      setHistorialTurnosData(data);
    } catch (error) {
      console.error('Error fetching hospital turns:', error);
    }
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
          <View key={item.id} style={styles.turnBlock}>
            <View style={styles.turnInfo}>
              <Text style={styles.turnText}>Paciente: {item.donante.nombre} {item.donante.apellido}</Text>
              <Text style={styles.turnText}>Nro Pedido: {item.pedidoHospital.id} - {item.pedidoHospital.tipoDonacion}</Text>
              <Text style={styles.turnText}>Hora: {item.hora}</Text>
            </View>
          </View>
        )}
        renderEmptyData={renderEmptyData}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDotColor: '#BA181B', // Color personalizado para el día seleccionado
        }}
      />
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
  });
  
  export default HistorialTurnosHospital;