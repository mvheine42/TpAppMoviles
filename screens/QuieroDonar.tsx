import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const QuieroDonar = () => {
  const greenStyle = {
    selectedDayBackgroundColor: 'green',
    selectedDayTextColor: 'white',
    todayTextColor: 'green',
    dayTextColor: 'green',
  };

  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  const minDate = today.toISOString().split('T')[0];
  const maxDate = oneMonthFromNow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  // Nuevo estado para mantener las fechas seleccionadas
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    const selectedDateString = day.dateString;
    setSelectedDate(selectedDateString);
  
    // Actualizar el estado de las fechas seleccionadas
    setMarkedDates({ [selectedDateString]: { selected: true } });

    if (selectedHorario) {
      // Mostrar el modal solo si ambos, la fecha y el horario, están seleccionados.
      setShowConfirmationModal(true);
    }
  };

  const hideConfirmationModal = () => {
    setSelectedHorario(null);
    setShowConfirmationModal(false);
  };

  const handleHorarioPress = (horario) => {
    setSelectedHorario(horario);
    setShowConfirmationModal(true);
  };

  const renderHorarioGrid = () => {
    if (!selectedDate) {
      return null; // No mostrar la grilla si no se ha seleccionado una fecha.
    }
  
    const horaInicio = 6;
    const horaFin = 20;
    const horarios = [];
  
    for (let hora = horaInicio; hora <= horaFin; hora++) {
      const horaString = hora < 10 ? `0${hora}:00` : `${hora}:00`;
      horarios.push(horaString);
    }
  
    const rows = [];
    const columnsPerRow = 5; // 5 columnas por fila
  
    for (let i = 0; i < horarios.length; i += columnsPerRow) {
      rows.push(horarios.slice(i, i + columnsPerRow));
    }
  
    return (
      <View style={styles.horarioGrid}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.horarioRow}>
            {row.map((horario, columnIndex) => (
              <Text
                key={columnIndex}
                style={styles.horaBox}
                onPress={() => handleHorarioPress(horario)}
              >
                {horario}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <View style={styles.tituloRequerimientos}>
        <Text style={styles.RequerimientosText}>TURNOS DISPONIBLES</Text>
        <Calendar
          theme={greenStyle}
          minDate={minDate}
          maxDate={maxDate}
          onDayPress={handleDayPress}
          markedDates={markedDates} // Agregar las fechas seleccionadas
        />
      </View>
      {showConfirmationModal && (
        <Modal animationType="slide" transparent={true} visible={showConfirmationModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.selectedDateText}>{selectedDate}</Text>
              <Text style={styles.selectedHorarioText}>{selectedHorario}</Text>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={hideConfirmationModal}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {selectedDate && renderHorarioGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'rgb(229, 56, 59)',
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  tituloRequerimientos: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 10,
  },
  RequerimientosText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'rgb(229, 56, 59)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  horarioGrid: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  horarioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horaBox: {
    width: '16%',
    height: 60,
    borderWidth: 2,
    borderColor: 'rgb(173, 193, 120)',
    alignItems: 'center', // Centra horizontalmente
    justifyContent: 'center', // Centra verticalmente
    backgroundColor: 'rgb(221, 229, 182)',
    borderRadius: 10,
    margin: '1%',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    textAlign: 'center', // Centra el texto horizontalmente
    textAlignVertical: 'center',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedHorarioText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
});

export default QuieroDonar;