import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation , useFocusEffect} from '@react-navigation/native';


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

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};


const API_URL = "http://localhost:3000"

const HomeHospital = (props) => {
  const [pedidos, setPedidos] = React.useState([]);
  const [turnos, setTurnos] = React.useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchTurnos();
      fetchPedidos();
    }, [])
  );

  const fetchPedidos = async () => {
    try {
      let response = await fetch(`${API_URL}/hospital/getPedidosById/${props.user.user.id}`);
      let pedidos = await response.json();
      console.log(pedidos)
      const activePedidos = pedidos.filter(pedido => pedido.state === 'active'); // Filter active pedidos
      setPedidos(activePedidos);
    } catch (error) {
      console.error("Error fetching pedidos:", error);
    }
  };
  

  const fetchTurnos = async () => {
    try {
      const response = await fetch(`${API_URL}/hospital/getTurnosByHospitalId/${props.user.user.id}`);
      const turnos = await response.json();
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 30);

      const filteredTurnos = turnos.filter(turno => {
        const turnoDate = new Date(turno.fecha);
        return (
          turnoDate >= today && turnoDate <= nextWeek
        );
      });

      setTurnos(filteredTurnos);
    } catch (error) {
      console.error("Error fetching turnos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bienvenido!</Text>
          <Text style={styles.dateText}>Fecha de Hoy: {getFormattedDateToday()}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Turnos:</Text>
      {turnos.length > 0 ? (
        <FlatList
          horizontal={true}
          data={turnos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.turnBlock}>
              <Text style={styles.turnInfoText}>Número de pedido: {item.idPedidoHospital}</Text>
              <Text style={styles.turnInfoText}>Fecha: {formatDate(item.fecha)}</Text>
              <Text style={styles.turnInfoText}>Hora: {formatTime(item.fecha)}hs</Text>
              <Text style={styles.turnInfoText}>Paciente: {item.donante.nombre} {item.donante.apellido}</Text>
              <Text style={styles.turnInfoText}>Tipo de Sangre: {item.donante.tipoSangre} {item.donante.factorRH}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No hay turnos activos</Text>
      )}

      <Text style={styles.sectionTitle}>Pedidos activos:</Text>
      {pedidos.length > 0 ? (
        <FlatList
          horizontal={true}
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.requestBlock}>
              <Text style={styles.requestText}>{item.tipoDonacion}</Text>
              <Text style={styles.requestText}>Tipo de Sangre: {item.tipoSangre}</Text>
              <Text style={styles.requestText}>Expira el: {formatDate(item.fechaHasta)}</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No hay pedidos activos</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RequestHospital')}> 
            <Text style={styles.buttonText}>Crear Pedido</Text>
          </TouchableOpacity>
        </View>
      )}
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
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  noDataText: {
    fontSize: 20,
    color: '#B1A7A6',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#A4161A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeHospital;
