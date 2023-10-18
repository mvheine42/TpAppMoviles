import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export const RequestHospital = (props) => {
  const [donationType, setDonationType] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleConfirm = () => {
    console.log('Solicitud confirmada:', {
      donationType,
      minAge,
      maxAge,
      startDate,
      endDate,
    });
    setIsConfirmed(true);
  };

  const isFormValid = donationType && minAge && maxAge && startDate && endDate;

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === 'ios'); // Show date picker for iOS immediately
    if (selectedDate) {
      setStartDate(selectedDate);
      // Ensure endDate is not before startDate
      if (endDate < selectedDate) {
        setEndDate(selectedDate);
      }
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === 'ios'); // Show date picker for iOS immediately
    if (selectedDate) {
      // Ensure endDate is not before startDate
      if (selectedDate >= startDate) {
        setEndDate(selectedDate);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Solicitar Pedido</Text>

      <Text style={styles.label}>Tipo de donación requerida</Text>
      <Picker
        selectedValue={donationType}
        onValueChange={(itemValue) => setDonationType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Sangre" value="Sangre" />
        <Picker.Item label="Médula" value="Médula" />
        <Picker.Item label="Plaquetas" value="Plaquetas" />
      </Picker>

      <Text style={styles.label}>De qué edad a qué edad</Text>
      <View style={styles.ageContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mínima"
          keyboardType="numeric"
          value={minAge}
          onChangeText={(text) => setMinAge(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Máxima"
          keyboardType="numeric"
          value={maxAge}
          onChangeText={(text) => setMaxAge(text)}
        />
      </View>

      <Text style={styles.label}>A partir de cuando</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.dateInput}>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="spinner"
          onChange={onChangeStartDate}
        />
      )}

      <Text style={styles.label}>Hasta cuando</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.dateInput}>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="spinner"
          onChange={onChangeEndDate}
          minimumDate={startDate}
        />
      )}

      <TouchableOpacity
        style={[styles.button, isFormValid ? styles.buttonEnabled : styles.buttonDisabled]}
        onPress={handleConfirm}
        disabled={!isFormValid}
      >
        <Text style={[styles.buttonText]}>Confirmar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 30,
    marginBottom: 40,
    color: '#A4161A',
    textAlign: 'center',
    fontWeight: 'bold', // Added fontWeight: 'bold'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: '#A4161A',
  },
  ageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'center', // Center align text
    fontSize: 18, // Adjust font size
    lineHeight: 40, // Center vertically in the input box
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonEnabled: {
    backgroundColor: '#A4161A',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default RequestHospital;