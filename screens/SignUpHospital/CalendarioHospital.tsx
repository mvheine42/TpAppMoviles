import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const backButtonImage = require('../imagenes/volver.png');

export const CalendarioHospital = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [viewMode, setViewMode] = useState('month'); // 'day', 'week', 'month'

  useEffect(() => {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    setSelectedDate(dateString);
    setCurrentDate(dateString);
  }, []);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderCalendar = () => {
    if (viewMode === 'day') {

     // Implement your day view rendering logic here
     return <Text>Day View</Text>;

    } else if (viewMode === 'week') { 
      // Obtener la fecha de inicio de la semana
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      // Crear un array de siete días a partir de la fecha de inicio
      const weekDays = Array.from({ length: 7 }, (_, index) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + index);
        return day;
      });

      return (
        <View style={styles.weekView}>
          {weekDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={styles.weekDay}
              onPress={() => onDayPress({ dateString: day.toISOString().split('T')[0] })}
            >
              <Text style={styles.weekDayText}>
                {day.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );

    } else {

      return (
        <Calendar
          current={currentDate}
          onDayPress={(day) => onDayPress(day)}
          hideExtraDays
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: '#A4161A',
              selectedTextColor: 'white',
            },
          }}
        />);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image source={backButtonImage} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendario de Turnos</Text>
      </View>

      <View style={styles.viewModeButtons}>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'day' && styles.selectedViewModeButton]}
          onPress={() => setViewMode('day')}
        >
          <Text style={styles.viewModeButtonText}>Día</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'week' && styles.selectedViewModeButton]}
          onPress={() => setViewMode('week')}
        >
          <Text style={styles.viewModeButtonText}>Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'month' && styles.selectedViewModeButton]}
          onPress={() => setViewMode('month')}
        >
          <Text style={styles.viewModeButtonText}>Mes</Text>
        </TouchableOpacity>
      </View>

      {renderCalendar()}
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
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    padding: 5,
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#A4161A',
  },
  viewModeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  viewModeButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#A4161A',
    borderRadius: 10,
  },
  selectedViewModeButton: {
    backgroundColor: '#8C0D11',
  },
  viewModeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  weekDayText: {
    fontSize: 16,
  },
});

export default CalendarioHospital;
