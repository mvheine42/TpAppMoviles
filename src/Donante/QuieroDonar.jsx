import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Image} from 'react-native';
import { Calendar } from 'react-native-calendars';
import CheckBox from '@react-native-community/checkbox';
import GraciasScreen from './GraciasScreen';
import Requerimientos from './Requerimientos';
import { ScrollView } from 'react-native-gesture-handler';

export const QuieroDonar = (props) => {
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
  const [acceptRequerimientos, setAcceptRequerimientos] = useState(false);

  const [markedDates, setMarkedDates] = useState({});

  const horariosNoDisponibles = {
    '2023-11-15': ['06:00','07:00','08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    '2023-11-16': ['06:00','07:00','08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    '2023-11-23': ['11:00', '12:00'],
    '2023-11-22': ['09:00', '13:00'],
  };

  const handleDayPress = (day) => {
    const selectedDateString = day.dateString;
    setSelectedDate(selectedDateString);

    setMarkedDates({ [selectedDateString]: { selected: true } });

    if (selectedHorario) {
      setShowConfirmationModal(true);
    }
  };

  const hideConfirmationModal = () => {
    setSelectedHorario(null);
    setShowConfirmationModal(false);
    setAcceptRequerimientos(false);
  };

  const handleHorarioPress = (horario) => {
    const horariosNoDisponiblesParaFecha = horariosNoDisponibles[selectedDate] || [];
    const isNoDisponible = horariosNoDisponiblesParaFecha.includes(horario);

    if (!isNoDisponible) {
      setSelectedHorario(horario);
      setShowConfirmationModal(true);
    }
  };

  const handleAcceptRequerimientosChange = () => {
    setAcceptRequerimientos(!acceptRequerimientos);
  };

  const renderHorarioGrid = () => {
    if (!selectedDate) {
      return null;
    }

    const horaInicio = 6;
    const horaFin = 20;
    const horariosNoDisponiblesParaFecha = horariosNoDisponibles[selectedDate] || [];

    const rows = [];
    const columnsPerRow = 5; // 5 columnas por fila
    const rowsPerGrid = 3; // 3 filas en la cuadrícula

    for (let hora = horaInicio; hora <= horaFin; hora++) {
      const horaString = hora < 10 ? `0${hora}:00` : `${hora}:00`;
      const isNoDisponible = horariosNoDisponiblesParaFecha.includes(horaString);

      const estilo = [styles.horaBox, isNoDisponible ? styles.horaBoxNoDisponible : null];

      rows.push(
        <Text
          key={horaString}
          style={estilo}
          onPress={() => handleHorarioPress(horaString)}
        >
          {horaString}
        </Text>
      );
    }

    const grid = [];
    for (let i = 0; i < rows.length; i += columnsPerRow) {
      grid.push(
        <View key={i} style={styles.horarioRow}>
          {rows.slice(i, i + columnsPerRow)}
        </View>
      );
    }

    const groupedGrid = [];
    for (let i = 0; i < grid.length; i += rowsPerGrid) {
      groupedGrid.push(
        <View key={i} style={styles.horarioGrid}>
          {grid.slice(i, i + rowsPerGrid)}
        </View>
      );
    }

    return (
      <View>
        {groupedGrid}
      </View>
    );
  };

  const [showRequerimientosModal, setShowRequerimientosModal] = useState(false);

  const handleRequerimientosLinkPress = () => {
    setShowRequerimientosModal(true);
  };

  const hideRequerimientosModal = () => {
    setShowRequerimientosModal(false);
  };

  const data = [
    { id: '1', source: require('../../imagenes/business-people.png'), text: 'Tener entre 16 y 65 años' },
    { id: '2', source: require('../../imagenes/bascula.png'), text: 'Pesar mas de 50K' },
    { id: '3', source: require('../../imagenes/sangre.png'), text: '2 meses desde ultima donacion' },
    { id: '4', source: require('../../imagenes/dormir.png'), text: 'dormir mas de 6 horas' },
    { id: '5', source: require('../../imagenes/plato.png'), text: 'Desayunar/Almorzar' },
    { id: '6', source: require('../../imagenes/tatuaje.png'), text: '6 meses desde ultimo tatuaje' },
  ];

  const renderItem = ({ item }) => (
      <View style={styles.circleContainer}>
          <Image source={item.source} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.iconText}>{item.text}</Text>
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <ScrollView>
      <View style={styles.tituloRequerimientos}>
        <Text style={styles.RequerimientosText}>TURNOS DISPONIBLES</Text>
        <Calendar
          theme={greenStyle}
          minDate={minDate}
          maxDate={maxDate}
          onDayPress={handleDayPress}
          markedDates={markedDates}
        />
      </View>
      </ScrollView>
      {showConfirmationModal && (
        <Modal animationType="slide" transparent={true} visible={showConfirmationModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.selectedDateText}>{selectedDate}</Text>
              <Text style={styles.selectedHorarioText}>{selectedHorario}</Text>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={acceptRequerimientos}
                  onValueChange={handleAcceptRequerimientosChange}
                />
                <TouchableOpacity onPress={handleRequerimientosLinkPress}>
                <Text style={styles.checkboxText}>Acepto y leí los{' '}
                  <Text style={styles.redText}>requerimientos</Text> para donar
                </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.confirmButton, !acceptRequerimientos && styles.disabledButton]}
                onPress={() => props.navigation.navigate(GraciasScreen)}
                disabled={!acceptRequerimientos}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={hideConfirmationModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {selectedDate && renderHorarioGrid()}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showRequerimientosModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalRequerimientosView}>
            <Text>Estos son los requerimientos para donar:</Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.iconContainer}
            />
            <TouchableOpacity style={styles.closeButton} onPress={hideRequerimientosModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
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
    textShadowRadius: 4,
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
    color: '#A4161A',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  horarioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horaBox: {
    width: '18%', // Ajusta el ancho según tus preferencias
    height: 70, // Ajusta el alto según tus preferencias
    borderWidth: 2,
    borderColor: 'rgb(173, 193, 120)',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  horaBoxNoDisponible: {
    backgroundColor: 'gray',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedHorarioText: {
    fontSize: 16,
    color: 'gray',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
  },
  redText: {
    color: 'red',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'gray', 
  },
  closeButton: {
    backgroundColor: 'red', 
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconContainer: {
    // Aumenta el padding para dar más espacio a los iconos
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    alignContent: 'space-between'
  },
  image: {
    width: 100,  // Aumenta el tamaño del icono
    height: 100, // Aumenta el tamaño del icono
    resizeMode: 'contain',
    marginTop: 15,
  },
  iconText: {
    marginTop: 5,
    textAlign: 'center', 
    color: 'black', 
    fontSize: 14,
  },
  textContainer: {
    width: 110, 
    alignItems: 'center', 
  },
  circleContainer:{
    alignItems: 'center',
    marginBottom: 15,
    padding: 5,
  },
  modalRequerimientosView:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
  
});

export default QuieroDonar;
