import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation, useFocusEffect} from '@react-navigation/native';

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
  const [pedidos, setPedidos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchPedidos();
    }, [])
  );
  

  const checkAndUpdatePedidos = async (pedidos) => {
    const today = new Date();

    for (const pedido of pedidos) {
      if (pedido.state === 'active' && new Date(pedido.fechaHasta) < today) {
        try {
          const response = await fetch(`${API_URL}/hospital/updatePedidoState/${pedido.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: 'completed' }),
          });

          if (response.ok) {
            console.log(`Pedido ${pedido.id} marcado como completado.`);
          } else {
            console.error(`Error al actualizar pedido ${pedido.id}:`, response.statusText);
          }
        } catch (error) {
          console.error(`Error actualizando pedido ${pedido.id}:`, error);
        }
      }
    }
  };

  const fetchPedidos = async () => {
    try {
      let response = await fetch(`${API_URL}/hospital/getPedidosById/${props.user.user.id}`);
      let pedidos = await response.json();
  
      // Priority for ordering
      const statusOrder = { 
        active: 1, 
        inactive: 2, 
        completed: 3, 
        cancelled: 4 
      };
  
      // Sort based on status priority
      pedidos.sort((a, b) => (statusOrder[a.state] || 5) - (statusOrder[b.state] || 5));
  
      setPedidos(pedidos);
      await checkAndUpdatePedidos(pedidos);
    } catch (error) {
      console.error('Error fetching pedidos:', error);
    }
  };

  const navigation = useNavigation();

  const cancelarPedido = (id) => {
    setSelectedPedido(id);
    setConfirmationVisible(true);
  };

  const confirmCancellation = async () => {
    try {
      const response = await fetch(`${API_URL}/hospital/updatePedidoState/${selectedPedido}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: 'cancelled' }),
      });

      if (response.ok) {
        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === selectedPedido ? { ...pedido, state: 'cancelled' } : pedido
          )
        );
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
    const { id, tipoDonacion, fechaDesde, fechaHasta, tipoSangre, factorRh, descripcion, state } = item;
    const fechaDesdeFormateada = formatDate(fechaDesde);
    const fechaHastaFormateada = formatDate(fechaHasta);

    const isActive = state === 'active';
    const isCompleted = state === 'completed';
    const isCancelled = state === 'cancelled';

    return (
      <View style={[ 
        styles.pedidoContainer, 
        isActive ? styles.activePedido : styles.inactivePedido, 
        isCompleted && styles.completedPedido,
        isCancelled && styles.cancelledPedido
      ]}>
        <View style={styles.pedidoInfo}>
          <Text style={[styles.pedidoTitle, !isActive && styles.inactiveText]}>{tipoDonacion}</Text>
          {isActive && (
            <TouchableOpacity onPress={() => cancelarPedido(id)}>
              <Image source={trashImage} style={styles.trashIcon} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.pedidoFechaText, !isActive && styles.inactiveText]}>
          {fechaDesdeFormateada + ' - '}{fechaHastaFormateada}
        </Text>
        <Text style={[styles.pedidoText, !isActive && styles.inactiveText]}>
          Tipo de Sangre: {tipoSangre} {factorRh}
        </Text>
        <Text style={[styles.descripcionText, !isActive && styles.inactiveText]}>{state}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('RequestHospital')}
      >
        <Text style={styles.addButtonText}>+ Agregar Pedido</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Historial de Pedidos</Text>

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
    backgroundColor: 'white',
  },
  inactivePedido: {
    backgroundColor: '#E0E0E0',
    opacity: 0.6,
  },
  completedPedido: {
    backgroundColor: '#E6F9E6',
  },
  cancelledPedido: {
    backgroundColor: '#FDEAEA',
    opacity: 0.8,
  },
  inactiveText: {
    color: '#7D7D7D',
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
