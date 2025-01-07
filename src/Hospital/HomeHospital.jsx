import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Función para obtener la fecha de hoy en formato "dd/mm/yyyy"
const getFormattedDateToday = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('es-AR', options);
  return formattedDate;
};

const API_URL = "http://localhost:3000"


const HomeHospital = (props) => {
  const [pedidos, setPedidos] = React.useState([]);
  const [turnos, setTurnos] = React.useState([]);
  const navigation = useNavigation();

  const goToMyProfile = () => {
    navigation.navigate('TurnosHospital');
  };

    React.useEffect(() => {
      fetchTurnos();
      fetchPedidos();
  }, [])

  const fetchPedidos = async () => {
    let pedidos = await fetch(`${API_URL}/hospital/getPedidosById/${props.user.user.id}`);
    pedidos = await pedidos.json();
    setPedidos(pedidos);
  }

  const fetchTurnos = async () => {
    let turnos = await fetch(`${API_URL}/hospital/getTurnosByHospitalId/${props.user.user.id}`);
    turnos = await turnos.json();
    setTurnos(turnos);
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bienvenido!</Text>
          <Text style={styles.dateText}>Fecha de Hoy: {getFormattedDateToday()}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Turnos:</Text>
      <FlatList
        horizontal={true}
        data={turnos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.turnBlock}>
            <Text style={styles.turnInfoText}>Número de pedido: {item.idPedidoHospital}</Text>
            <Text style={styles.turnInfoText}>Fecha: {formatDate(item.fecha)}</Text>
            <Text style={styles.turnInfoText}>Hora: {item.hora}hs</Text>
            <Text style={styles.turnInfoText}>Paciente: {item.donante.nombre} {item.donante.apellido}</Text>
            <Text style={styles.turnInfoText}>Tipo de Sangre: {item.donante.tipoSangre} {item.donante.factorRH}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Pedidos activos:</Text>
      <FlatList
        horizontal={true}
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.requestBlock}>
            <Text style={styles.requestText}>{item.tipoDonacion}</Text>
            <Text style={styles.requestText}>Tipo de Sangre: {item.tipoSangre} </Text>
            <Text style={styles.requestText}>
              Expira el: {formatDate(item.fechaHasta)}
            </Text>
          </View>
        )}
      />
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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  dateText: {
    fontSize: 18,
    color: '#B1A7A6',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
    color: '#A4161A',
  },
  turnBlock: {
    width: 300,
    marginHorizontal: 10,
    backgroundColor: '#A4161A',
    padding: 20,
    borderRadius: 10,
  },
  turnInfoText: {
    fontSize: 20,
    color: 'white',
    marginTop: 7,
  },
  requestBlock: {
    width: 300,
    marginHorizontal: 10,
    backgroundColor: '#660708',
    padding: 20,
    borderRadius: 10,
  },
  requestText: {
    fontSize: 20,
    color: 'white',
    marginTop: 7,
  },
});

export default HomeHospital;
