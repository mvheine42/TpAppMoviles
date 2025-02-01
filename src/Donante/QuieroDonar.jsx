import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Image} from 'react-native';
import { Calendar } from 'react-native-calendars';
import CheckBox from '@react-native-community/checkbox';
import GraciasScreen from './GraciasScreen';
import { ScrollView } from 'react-native-gesture-handler';

export const QuieroDonar = (props) => {

  const [turnosOcupados, setTurnosOcupados] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [acceptRequerimientos, setAcceptRequerimientos] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const donacion = props.route.params?.tipoDonacion;
  console.log(props.route.params);

  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);
  const minDate = today.toISOString().split('T')[0];
  const maxDate = oneMonthFromNow.toISOString().split('T')[0];

  const API_URL = "http://localhost:3000";
  const hospital = props.route.params?.hospital;
  
  React.useEffect(() => {fetchTurnosOcupados();}, []);
  
  const fetchTurnosOcupados = async () => {
    let turnosOcupados = await fetch(`${API_URL}/hospital/getTurnosByHospitalId/${hospital.id}`);
    turnosOcupados = await turnosOcupados.json();

    const horariosNoDisponibles = turnosOcupados.reduce((acc, turno) => {
      const fecha = turno.fecha.split("T")[0];
      const hora = new Date(turno.fecha).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      if (!acc[fecha]) {
        acc[fecha] = [];
      }
      if (!acc[fecha].includes(hora)) {
        acc[fecha].push(hora);
      }

      return acc;
    }, {});

    setTurnosOcupados(horariosNoDisponibles);
  };
  
  const greenStyle = {
    selectedDayBackgroundColor: 'green',
    selectedDayTextColor: 'white',
    todayTextColor: 'green',
    dayTextColor: 'green',
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
    const horariosNoDisponiblesParaFecha = turnosOcupados[selectedDate] || [];
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
    if (!selectedDate) { return null;}
  
    const horaInicio = 6;
    const horaFin = 20;
    const horariosNoDisponiblesParaFecha = turnosOcupados[selectedDate] || [];
    
    const rows = [];
    const columnsPerRow = 5;
    const rowsPerGrid = 6;

    const hoy = new Date();
    const esHoy = selectedDate === hoy.toISOString().split("T")[0];
    const horaActual = hoy.getHours();
    const minutosActuales = hoy.getMinutes();
  
    for (let hora = horaInicio; hora <= horaFin; hora++) {
      for (let min = 0; min < 60; min += 30) {
        const horaString = `${hora.toString().padStart(2, "0")}:${min === 0 ? "00" : "30"}`;
  
        // Verificar si el turno está ocupado o si ya pasó en el día actual
        const isNoDisponible =
          horariosNoDisponiblesParaFecha.includes(horaString) || 
          (esHoy && (hora < horaActual || (hora === horaActual && min < minutosActuales)));
  
        const estilo = [styles.horaBox, isNoDisponible ? styles.horaBoxNoDisponible : null];
  
        rows.push(
          <Text
            key={horaString}
            style={estilo}
            onPress={() => !isNoDisponible && handleHorarioPress(horaString)}
          >
            {horaString}
          </Text>
        );
      }
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
  
    return <View>{groupedGrid}</View>;
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

    const confirmTurn = async () => {

      if (!selectedDate || !selectedHorario) {
        console.error("Debe seleccionar una fecha y horario antes de confirmar.");
        return;
      }
    
      const idDonante = props.user.user.id; // Asegúrate de obtenerlo correctamente
      const idPedidoHospital = props.route.params?.idPedidoHospital;
    
      const fechaCompleta = new Date(`${selectedDate}T${selectedHorario}:00`);
    
      const turnoData = {
        idDonante,
        idPedidoHospital,
        fecha: fechaCompleta,
      };
    
      console.log("Turno a postear: ", turnoData);
    
      try {
        const response = await fetch(`${API_URL}/donante/postTurno`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(turnoData),
        });
    
        if (response.ok) {
          console.log("Turno confirmado correctamente.");
          props.navigation.navigate(GraciasScreen);
        } else {
          console.error("Error al confirmar turno:", await response.text());
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>

      <View style={styles.tituloRequerimientos}>
        <Text style={styles.RequerimientosText}>Turnos Disponibles</Text>
        <Calendar
          theme={greenStyle}
          minDate={minDate}
          maxDate={maxDate}
          onDayPress={handleDayPress}
          markedDates={markedDates}
          style={styles.calendarStyle}
        />
      </View>
      <ScrollView style={styles.horariosScroll}>
        {selectedDate && renderHorarioGrid()}
      </ScrollView>
      
      {showConfirmationModal && (
        <Modal animationType="slide" transparent={true} visible={showConfirmationModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.confirmTitle}>Confirme su turno</Text>
              <Text style={styles.selectedDateText}>{selectedDate} a las {selectedHorario}hs</Text>
              <Text style={styles.donationType}>Donación para: {donacion}</Text>
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
              <Text>Por favor asegurese de cumplir con todos los requisitos el día que se presenta al turno</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.confirmButton, !acceptRequerimientos && styles.disabledButton]}
                  onPress={confirmTurn}
                  disabled={!acceptRequerimientos}
                >
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={hideConfirmationModal}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      
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
            <TouchableOpacity style={styles.closeButtonReq} onPress={hideRequerimientosModal}>
              <Text style={styles.closeButtonTextReq}>Cerrar</Text>
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
  calendarStyle: { 
    width: 350,
    padding: 10,
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
    marginTop: 50,
    marginBottom: 70
  },
  modalView: {
    heigth: 400,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowRadius: 3.84,
    elevation: 10,
  },
  confirmTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15
  },
  selectedDateText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 25
  },
  donationType: {
    fontSize: 24,
    color: 'black',
    marginBottom: 25
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 2,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    gap: 10,
  },
  confirmButton: {
    width: '40%',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    width: '40%',
    backgroundColor: 'red', 
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  redText: {
    color: 'red',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'gray', 
  },
  horariosScroll: {
    flex: 1, 
    marginHorizontal: 10,
    maxHeight: 300,
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
  closeButtonReq: {
    width: 200,
    backgroundColor: 'red', 
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonTextReq: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconContainer: {
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
    margin: 30,
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
