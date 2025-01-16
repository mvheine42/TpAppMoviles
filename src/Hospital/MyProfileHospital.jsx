import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const hospitalImage = require('../../imagenes/hospital.png');

export const MyProfileHospital = (props) => {
  const [editing, setEditing] = useState(false);
  const [editedHospital, setEditedHospital] = useState({ ...props.user.user });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedHospital({ ...id });
  };

  const handleSave = () => {
    setEditing(false);
    setEditedHospital({ ...editedHospital });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <View style={styles.imageWrapper}>
            <Image source={hospitalImage} style={styles.hospitalImage} />
          </View>
        </View>
        <Text style={styles.hospitalName}>{editedHospital.nombre}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Dirección</Text>
          {editing ? (
            <TextInput
              style={styles.infoEdit}
              value={editedHospital.direccion}
              onChangeText={(text) => setEditedHospital({ ...editedHospital, direccion: text })}
            />
          ) : (
            <Text style={styles.info}>{editedHospital.direccion}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Teléfono</Text>
          {editing ? (
            <TextInput
              style={styles.infoEdit}
              value={editedHospital.nombre}
              onChangeText={(text) => setEditedHospital({ ...editedHospital, nombre: text })}
            />
          ) : (
            <Text style={styles.info}>{editedHospital.nombre}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Correo</Text>
          {editing ? (
            <TextInput
              style={styles.infoEdit}
              value={editedHospital.email}
              onChangeText={(text) => setEditedHospital({ ...editedHospital, email: text })}
            />
          ) : (
            <Text style={styles.info}>{editedHospital.email}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Responsable</Text>
          {editing ? (
            <TextInput
              style={styles.infoEdit}
              value={editedHospital.nomResp}
              onChangeText={(text) => setEditedHospital({ ...editedHospital, nomResp: text })}
            />
          ) : (
            <Text style={styles.info}>{editedHospital.nomResp}</Text>
          )}
        </View>

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
