import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';

const historialTurnosData = [
  {
    id: 1,
    patient: 'Ana González',
    donation: 'Sangre AB+',
    time: '2023-10-20 10:30:00',
  },
  {
    id: 2,
    patient: 'Jorge Martinez',
    donation: 'Plaquetas',
    time: '2023-10-21 13:15:00',
  },
  {
    id: 3,
    patient: 'Laura Rodriguez',
    donation: 'Sangre O-',
    time: '2023-10-21 15:30:00',
  },
  {
    id: 4,
    patient: 'Carlos Pérez',
    donation: 'Médula',
    time: '2023-10-27 16:45:00',
  },
  {
    id: 5,
    patient: 'María López',
    donation: 'Sangre A+',
    time: '2023-10-27 18:00:00',
  },
  {
    id: 6,
    patient: 'Pedro Rodríguez',
    donation: 'Sangre A+',
    time: '2023-10-27 09:30:00',
  },
  {
    id: 7,
    patient: 'Luis Rodriguez',
    donation: 'Médula',
    time: '2023-10-30 10:45:00',
  },
  {
    id: 8,
    patient: 'Ana Silva',
    donation: 'Sangre B-',
    time: '2023-11-15 13:00:00',
  },
  {
    id: 9,
    patient: 'Victoria Arce',
    donation: 'Sangre O-',
    time: '2023-11-21 19:30:00',
  },
  {
    id: 10,
    patient: 'Juan Manuel Santos',
    donation: 'Médula',
    time: '2023-11-08 16:45:00',
  },
];

export const HistorialTurnosHospital = () => {
    function getFormattedCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    const [selectedDate, setSelectedDate] = useState(getFormattedCurrentDate);
  
    const items = historialTurnosData.reduce((result, turno) => {
      const date = turno.time.split(' ')[0];
      if (date === selectedDate) {
        if (!result[date]) {
          result[date] = [];
        }
        result[date].push(turno);
      }
      return result;
    }, {});
  
    const markedDates = historialTurnosData.reduce((result, turno) => {
      const date = turno.time.split(' ')[0];
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
                <Text style={styles.turnText}>Paciente: {item.patient}</Text>
                <Text style={styles.turnText}>Donación: {item.donation}</Text>
                <Text style={styles.turnText}>Hora: {item.time.split(' ')[1]}</Text>
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