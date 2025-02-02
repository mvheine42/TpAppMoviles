import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const trashImage = require('../../imagenes/basura.png');

const API_URL = "http://localhost:3000";

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('es-AR', options);
  return formattedDate;
};

export const PedidosEnCurso = (props) => {
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [pedidos, setPedidos] = React.useState([]);

  React.useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    let pedidos = await fetch(`${API_URL}/hospital/getPedidosById/${props.user.user.id}`);
    pedidos = await pedidos.json();
    setPedidos(pedidos);
  };

  const navigation = useNavigation();

  const cancelarPedido = (id) => {
    setSelectedPedido(id);
    setConfirmationVisible(true);
  };

  const confirmCancellation = async () => {
    try {
      console.log(selectedPedido);
      const response = await fetch(`${API_URL}/hospital/deletePedido/${selectedPedido}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== selectedPedido));
      } else {
        console.error('Failed to cancel pedido:', response.statusText);
      }
    } catch (error) {
      console.error('Error cancelling pedido:', error);
    } finally {
      setSelectedPedido(null);
      setConfirmationVisible(false);
    }
  };

  const cancelCancellation = () => {
    setSelectedPedido(null);
    setConfirmationVisible(false);
  };

  const renderPedido = ({ item }) => {
    const { id, tipoDonacion, fechaDesde, fechaHasta, tipoSangre, factorRh, descripcion } = item;
    const fechaDesdeFormateada = formatDate(fechaDesde);
    const fechaHastaFormateada = formatDate(fechaHasta);

    return (
      <View style={styles.pedidoContainer}>
        <View style={styles.pedidoInfo}>
          <Text style={styles.pedidoTitle}>{tipoDonacion}</Text>
          <TouchableOpacity onPress={() => cancelarPedido(id)}>
            <Image source={trashImage} style={styles.trashIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.pedidoFechaText}>
          {fechaDesdeFormateada + ' - '}{fechaHastaFormateada}
        </Text>
        <Text style={styles.pedidoText}>Tipo de Sangre: {tipoSangre} {factorRh}</Text>
        <Text style={styles.descripcionText}>{descripcion}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('RequestHospital');
        }}
      >
        <Text style={styles.addButtonText}>+ Agregar Pedido</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Pedidos Activos</Text>

      {pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPedido}
        />
      ) : (
        <Text style={styles.noPedidosText}>No hay pedidos activos.</Text>
      )}

      <Modal isVisible={isConfirmationVisible}>
        <View style={styles.confirmationModal}>
          <Text style={styles.confirmationQuestion}>¿Estás seguro de cancelar este pedido?</Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity onPress={cancelCancellation} style={styles.confirmationButton}>
              <Text style={styles.confirmationButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmCancellation} style={styles.confirmationButton}>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    color: '#A4161A',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'left',
    color: '#A4161A',
  },
  addButton: {
    backgroundColor: '#A4161A',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  pedidoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  pedidoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pedidoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  pedidoText: {
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
  },
  pedidoFechaText: {
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  descripcionText: {
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
    fontStyle: 'italic',
  },
  trashIcon: {
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
  noPedidosText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PedidosEnCurso;
