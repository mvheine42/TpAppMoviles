import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const mockSolicitudesEnCurso = [
  { id: '1', tipo: 'Sangre A+', edadMinima: 18, edadMaxima: 60, tiempoExpiracion: 30 },
  { id: '2', tipo: 'Médula', edadMinima: 20, edadMaxima: 50, tiempoExpiracion: 15 },
  { id: '3', tipo: 'Sangre B-', edadMinima: 18, edadMaxima: 60, tiempoExpiracion: 25 },
  { id: '4', tipo: 'Plaquetas AB+', edadMinima: 25, edadMaxima: 65, tiempoExpiracion: 20 },
  { id: '5', tipo: 'Sangre O+', edadMinima: 20, edadMaxima: 50, tiempoExpiracion: 10 },
  { id: '6', tipo: 'Plaquetas A-', edadMinima: 30, edadMaxima: 70, tiempoExpiracion: 40 },
  { id: '7', tipo: 'Médula', edadMinima: 18, edadMaxima: 60, tiempoExpiracion: 35 },
  { id: '8', tipo: 'Sangre AB+', edadMinima: 25, edadMaxima: 65, tiempoExpiracion: 18 },
  { id: '9', tipo: 'Sangre B+', edadMinima: 20, edadMaxima: 50, tiempoExpiracion: 22 },
  { id: '10', tipo: 'Médula', edadMinima: 18, edadMaxima: 60, tiempoExpiracion: 30 },
];

export const PedidosEnCurso = (props: any) => {
  const [solicitudes, setSolicitudes] = useState(mockSolicitudesEnCurso);

  const cancelarSolicitud = (id) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que deseas cancelar esta solicitud?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí',
          onPress: () => {
            setSolicitudes(solicitudes.filter((solicitud) => solicitud.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderSolicitud = ({ item }) => {
    const { id, tipo, edadMinima, edadMaxima, tiempoExpiracion } = item;
    const titulo = `${id}: ${tipo}`;
    const tiempoExpiracionTexto = tiempoExpiracion > 1 ? 'meses' : 'mes';

    return (
      <View style={styles.solicitudContainer}>
        <Text style={styles.solicitudTitle}>{titulo}</Text>
        <Text style={styles.solicitudText}>
          Edad mínima: {edadMinima} años
        </Text>
        <Text style={styles.solicitudText}>
          Edad máxima: {edadMaxima} años
        </Text>
        <Text style={styles.solicitudText}>
          Tiempo de expiración: {tiempoExpiracion} {tiempoExpiracionTexto}
        </Text>
        <TouchableOpacity onPress={() => cancelarSolicitud(id)}>
          <Text style={styles.cancelarText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text onPress={() => props.navigation.navigate('HomeHospital')} style={styles.backButton}>{'<'}</Text>
      <Text style={styles.title}>Solicitudes en Curso</Text>
      <FlatList
        data={solicitudes}
        keyExtractor={(item) => item.id}
        renderItem={renderSolicitud}
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#A4161A',
  },
  backButton: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'left',
    position: 'absolute',
    left: 10,
    top: 10,
  },
  solicitudContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  solicitudTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#A4161A',
  },
  solicitudText: {
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
  },
  cancelarText: {
    color: '#A4161A',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PedidosEnCurso;
