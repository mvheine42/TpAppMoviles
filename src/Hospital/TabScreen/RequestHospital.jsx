import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Platform, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const bloodTypes = ['A', 'B', 'AB', 'O'];
const rhFactors = ['+', '-'];

export const RequestHospital = (props) => {
  const [donationType, setDonationType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedRhFactor, setSelectedRhFactor] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleConfirm = async () => {
    try {
      const pedidoData = {
        idHospital: props.userId.id,
        fechaDesde: startDate.toISOString(),
        fechaHasta: endDate.toISOString(),
        tipoDonacion: donationType,
        tipoSangre: selectedBloodType,
        factorRh: selectedRhFactor,
        descripcion: description,
      };
  
      // Realiza la solicitud POST al backend
      const response = await fetch('http://localhost:3000/hospital/postPedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });
  
      if (response.ok) {
        setIsConfirmed(true);
        toggleModal();
        Alert.alert('Solicitud Confirmada', 'La solicitud se realizó con éxito.', [
          { text: 'OK', onPress: () => navigation.navigate('HomeHospital') },
        ]);
      } else {
        console.error('Error al realizar la solicitud POST al backend');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  };
  

  const handleCancel = () => {
    toggleModal();
  };

  const isFormValid = donationType && (selectedBloodType || selectedRhFactor) && description;

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
      if (endDate < selectedDate) {
        setEndDate(selectedDate);
      }
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
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

      <Text style={styles.label}>Tipo de sangre</Text>
      <Picker
        selectedValue={selectedBloodType}
        onValueChange={(itemValue) => setSelectedBloodType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione" value="" />
        {bloodTypes.map((type) => (
          <Picker.Item label={type} value={type} key={type} />
        ))}
      </Picker>

      <Text style={styles.label}>Factor RH</Text>
      <Picker
        selectedValue={selectedRhFactor}
        onValueChange={(itemValue) => setSelectedRhFactor(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione" value="" />
        {rhFactors.map((factor) => (
          <Picker.Item label={factor} value={factor} key={factor} />
        ))}
      </Picker>

      <Text style={styles.label}>Desde cuando</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.dateInput}>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="spinner"
          onChange={onChangeStartDate}
          minimumDate={new Date()}
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
          minimumDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}
        />
      )}

      <Text style={styles.label}>Descripcion</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese..."
        placeholderTextColor="black"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TouchableOpacity
        style={[
          styles.button,
          isFormValid ? styles.buttonEnabled : styles.buttonDisabled,
        ]}
        onPress={() => {
          if (isFormValid) toggleModal();
        }}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

      
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>    x</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Datos Confirmados</Text>
          <Text style={styles.modalText}>Tipo de Donación: {donationType}</Text>
          <Text style={styles.modalText}>Tipo de Sangre: {selectedBloodType} {selectedRhFactor}</Text>
          <Text style={styles.modalText}>Desde: {startDate.toDateString()}</Text>
          <Text style={styles.modalText}>Hasta: {endDate.toDateString()}</Text>
          <Text style={styles.modalText}>Descripción: {description}</Text>

          <TouchableOpacity onPress={handleConfirm} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>Solicitar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 25,
    fontSize: 35,
    marginBottom: 25,
    color: '#A4161A',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    color: 'black',
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
    marginBottom: 0,
  },
  label: {
    fontSize: 20,
    color: '#A4161A',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 2,
    fontSize: 15,
    color: 'black',
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 40,
    color: 'black',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    color: 'black',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#A4161A',
  },
  modalText:{
    fontSize: 18,
    color: 'black'
  },
  modalCloseButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  modalCloseButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#A4161A',
  },
  validationError: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 3,
    right: 20,
  },
  closeButtonText: {
    fontSize: 28,
    color: 'black',  // Color de la "X"
  },
});

export default RequestHospital;
