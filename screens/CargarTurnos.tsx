import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export const CargarTurnos = (props: any) => {
  const [fecha, setFecha] = useState(new Date()); // Cambia el estado inicial a una fecha
  const [hora, setHora] = useState('');
  const [tipo, setTipo] = useState('Sangre');
  const [tipoSangre, setTipoSangre] = useState('O');
  const [factorSangre, setFactorSangre] = useState('Positivo');
  const [hospital, setHospital] = useState('');

  const handleCargarTurno = () => {
    // Aquí puedes agregar la lógica para cargar los datos del turno en tu sistema
    // Puedes enviar los datos a un servidor o almacenarlos localmente.

    // Después de cargar el turno, puedes mostrar un mensaje de éxito o navegar a otra pantalla.
    alert('Turno cargado exitosamente');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cargar Turnos Disponibles</Text>
      {/* DatePicker para seleccionar la fecha */}
      <DateTimePicker
        value={fecha}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => setFecha(selectedDate || fecha)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora del Turno"
        onChangeText={(text) => setHora(text)}
      />
      <Picker
        selectedValue={tipo}
        style={styles.picker}
        onValueChange={(itemValue) => setTipo(itemValue)}
      >
        <Picker.Item label="Sangre" value="Sangre" />
        <Picker.Item label="Plaquetas" value="Plaquetas" />
        <Picker.Item label="Médula" value="Médula" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Tipo de Sangre"
        onChangeText={(text) => setTipoSangre(text)}
      />
      <Picker
        selectedValue={factorSangre}
        style={styles.picker}
        onValueChange={(itemValue) => setFactorSangre(itemValue)}
      >
        <Picker.Item label="Positivo" value="Positivo" />
        <Picker.Item label="Negativo" value="Negativo" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Hospital"
        onChangeText={(text) => setHospital(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleCargarTurno}>
        <Text style={styles.buttonText}>Cargar Turno</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'rgb(229, 56, 59)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
