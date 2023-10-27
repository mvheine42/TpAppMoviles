import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const editImage = require('../imagenes/icons8-edit-48.png');
const hospitalImage = require('../imagenes/usuario.png');

export const MyProfileHospital = () => {
  const [hospital, setHospital] = useState({
    name: 'Hospital San Juan',
    direccion: '123 Calle Principal',
    correo: 'hospital@sanjuan.com',
    telefono: '123-456-7890',
    responsableName: 'Dr. John Doe',
    responsableCorreo: 'john.doe@sanjuan.com',
    horario: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
  });

  const [editingField, setEditingField] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const [tempHospital, setTempHospital] = useState(hospital);

  const handleSaveChanges = () => {
    // Implementa aquí la lógica para guardar los cambios, por ejemplo, haciendo una solicitud a tu API.
    setChangesMade(false);
    setEditingField(null);
  };

  const handleEditField = (field) => {
    setTempHospital({ ...hospital }); // Almacena una copia temporal del hospital en caso de cancelación.
    setEditingField(field);
  };

  const handleCancelEdit = () => {
    setHospital({ ...tempHospital }); // Restaura el valor original desde la copia temporal.
    setChangesMade(false);
    setEditingField(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={hospitalImage}
          style={[styles.hospitalImage, { tintColor: '#A4161A' }]}
        />
        <Text style={styles.title}>Mi Perfil</Text>
      </View>
      <Text style={styles.subtitle}>{hospital.name}</Text>

      {Object.keys(hospital).map((field) => (
        <View key={field} style={styles.fieldContainer}>
          {field !== 'name' && ( // No muestra el nombre como un campo editable
            <>
              <Text style={styles.label}>
                {field === 'direccion'
                  ? 'Dirección'
                  : field === 'correo'
                  ? 'Correo'
                  : field === 'telefono'
                  ? 'Teléfono'
                  : field === 'responsableName'
                  ? 'Responsable'
                  : field === 'responsableCorreo'
                  ? 'Correo del Responsable'
                  : 'Horario de Atención'}
              </Text>
              <View style={styles.editableField}>
                {editingField !== field ? (
                  <>
                    <Text style={styles.input}>{hospital[field]}</Text>
                    <TouchableOpacity onPress={() => handleEditField(field)}>
                      <Image source={editImage} style={[styles.editIcon, { tintColor: '#660708' }]} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TextInput
                      style={styles.input}
                      value={hospital[field]}
                      onChangeText={(text) => {
                        setHospital({ ...hospital, [field]: text });
                        setChangesMade(true);
                      }}
                    />
                  </>
                )}
              </View>
            </>
          )}
        </View>
      ))}

      <View style={styles.editButtons}>
        {editingField && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCancelEdit}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSaveChanges}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  subtitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#660708',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#A4161A',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: '90%',
  },
  editableField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#A4161A',
    borderRadius: 22,
    padding: 12,
    margin: 5,
    width: 120,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default MyProfileHospital;