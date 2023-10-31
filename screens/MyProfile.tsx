import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const profileImage = require('./imagenes/icons8-circled-user-female-skin-type-4-100.png');

export const MyProfile = (props:any) => {
  const [perfil, setPerfil] = useState({
    name: 'Victoria Heine',
    correo: 'mvheine42@gmail.com',
    edad: 23,
    peso: '60kg',
    medicacion: 'anticonceptivos',
    embarazo: 'no',
  });
  const [editing, setEditing] = useState(false);
  const [editedPerfil, setEditedPerfil] = useState({ ...perfil });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedPerfil({ ...perfil });
  };

  const handleSave = () => {
    setEditing(false);
    setPerfil({ ...editedPerfil });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <View style={styles.imageWrapper}>
            <Image source={profileImage} style={styles.perfilImage} />
          </View>
        </View>
        <Text style={styles.perfilName}>{perfil.name}</Text>
      </View>
      <View style={styles.content}>
        {Object.keys(perfil).map((field) => (
          <View key={field} style={styles.fieldContainer}>
            {field !== 'name' && (
              <>
                <Text style={styles.label}>
                  {field === 'correo'
                    ? 'Correo'
                    : field === 'edad'
                    ? 'Edad'
                    : field === 'peso'
                    ? 'Peso'
                    : field === 'medicacion'
                    ? 'Medicacion'
                    : field === 'embarazo'
                    ? 'Probabilidad de embarazo'
                    : 'Horario de Atención'}
                </Text>
                {editing ? (
                  <TextInput
                    style={styles.infoEdit}
                    value={editedPerfil[field]}
                    onChangeText={(text) => {
                      const newEditedPerfil = { ...editedPerfil };
                      newEditedPerfil[field] = text;
                      setEditedPerfil(newEditedPerfil);
                    }}
                  />
                ) : (
                  <Text style={styles.info}>{perfil[field]}</Text>
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
      <View style={styles.timeSinceDonation}>
        <Text style={styles.label}>Tiempo desde la última donación: 6 meses y 6 días</Text>
      </View>
      <TouchableOpacity
  onPress={() => props.navigation.navigate('HistoryDonation')}
>
  <View style={styles.historyBenefits}>
    <Text style={styles.historyBenefitsText}>Historial y Beneficios</Text>
  </View>
</TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    height: '100%',
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
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 100,
    height: 100,
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
  perfilImage: {
    width: 100,
    height: 100,
  },
  perfilName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#660708',
    marginTop: 50, // Reduce the margin here
    backgroundColor: '#F5F3F4',
    borderRadius: 10,
    padding: 5,
    textAlign: 'center',
    width: '100%',
  },
  content: {
    backgroundColor: '#F5F3F4',
    borderRadius: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
  timeSinceDonation: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#F5F3F4', // Color de fondo
    padding: 10, // Espaciado interior
    borderRadius: 10, // Bordes redondeados
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  historyBenefits: {
    backgroundColor: '#F5F3F4', // Color de fondo del contenedor
    borderRadius: 10, // Bordes redondeados
    padding: 15, // Espaciado interior
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  historyBenefitsText: {
    color: 'black', // Color del texto
    fontWeight: 'bold', // Estilo de texto en negrita
    fontSize: 20, // Tamaño de fuente
  },   
});

export default MyProfile;
