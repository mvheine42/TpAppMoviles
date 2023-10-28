import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const hospitalImage = require('../imagenes/hospital.png');

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
  const [editing, setEditing] = useState(false);
  const [editedHospital, setEditedHospital] = useState({ ...hospital });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedHospital({ ...hospital });
  };

  const handleSave = () => {
    setEditing(false);
    setHospital({ ...editedHospital });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <View style={styles.imageWrapper}>
            <Image source={hospitalImage} style={styles.hospitalImage} />
          </View>
        </View>
        <Text style={styles.hospitalName}>{hospital.name}</Text>
      </View>
      <View style={styles.content}>
        {Object.keys(hospital).map((field) => (
          <View key={field} style={styles.fieldContainer}>
            {field !== 'name' && (
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
                {editing ? (
                  <TextInput
                    style={styles.infoEdit}
                    value={editedHospital[field]}
                    onChangeText={(text) => {
                      const newEditedHospital = { ...editedHospital };
                      newEditedHospital[field] = text;
                      setEditedHospital(newEditedHospital);
                    }}
                  />
                ) : (
                  <Text style={styles.info}>{hospital[field]}</Text>
                )}
              </>
            )}
          </View>
        ))}
        {editing ? (
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#A4161A',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A4161A',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 15,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 140,
    height: 140,
    backgroundColor: '#D3D3D3',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 40,
  },
  hospitalImage: {
    width: 100,
    height: 100,
  },
  hospitalName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#660708',
    marginTop: 60,
    backgroundColor: '#F5F3F4',
    borderRadius: 10,
    padding: 5,
    textAlign: 'center',
    width:'100%',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F3F4',
    borderRadius: 20,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  info: {
    fontSize: 16,
    color: 'black',
  },
  infoEdit: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    color: 'black',
  },
  editButton: {
    backgroundColor: '#A4161A',
    borderRadius: 15,
    padding: 15,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#B1A7A6',
    borderRadius: 20,
    padding: 15,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#A4161A',
    borderRadius: 20,
    padding: 15,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default MyProfileHospital;
