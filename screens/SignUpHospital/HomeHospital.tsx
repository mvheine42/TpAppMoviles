import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Función para obtener la fecha de hoy en formato "dd/mm/yyyy"
const getFormattedDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

// Mock data for turns
const turnsData = [
  {
    id: 1,
    patient: 'Juan Perez',
    donation: 'Sangre A+',
    time: '10:00 AM',
  },
  {
    id: 2,
    patient: 'María García',
    donation: 'Plaquetas',
    time: '11:30 AM',
  },
  {
    id: 3,
    patient: 'Carlos Sánchez',
    donation: 'Sangre B-',
    time: '12:45 PM',
  },
  // Add more turn data here
];

// Mock data for current requests
const currentRequests = [
  { id: '1', type: 'Sangre A+', minAge: 18, maxAge: 60, expirationTime: 30 },
  { id: '2', type: 'Médula', minAge: 20, maxAge: 50, expirationTime: 15 },
  { id: '3', type: 'Sangre B-', minAge: 18, maxAge: 60, expirationTime: 25 },
  // Add more request data here
];

export const HomeHospital = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bienvenido!</Text>
          <Text style={styles.dateText}>Fecha de Hoy: {getFormattedDate()}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Turnos de hoy:</Text>
      <FlatList
        horizontal={true}
        data={turnsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.turnBlock}>
            <Text style={styles.turnInfoText}>Paciente: {item.patient}</Text>
            <Text style={styles.turnInfoText}>Donación: {item.donation}</Text>
            <Text style={styles.turnInfoText}>Hora: {item.time}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Pedidos activos:</Text>
      <FlatList
        horizontal={true}
        data={currentRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.requestBlock}>
            <Text style={styles.requestText}>Tipo: {item.type}</Text>
            <Text style={styles.requestText}>Edad mínima: {item.minAge} años</Text>
            <Text style={styles.requestText}>Edad máxima: {item.maxAge} años</Text>
            <Text style={styles.requestText}>
              Expira en: {item.expirationTime} {item.expirationTime > 1 ? 'meses' : 'mes'}
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
