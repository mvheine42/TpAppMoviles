import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity} from 'react-native';

const hospitalImage = require('../../imagenes/hospital.png');
const logOutImage = require('../../imagenes/icons8-logout-100-2.png');


export const MyProfileHospital = (props) => {
  const [editedHospital] = useState({ ...props.user.user });
  const [loggingOut, setLoggingOut] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => props.logOut()} // Trigger the logout function
          disabled={loggingOut}>
          <Image source={logOutImage} style={styles.logOutImage} />
        </TouchableOpacity>
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
            <Text style={styles.info}>
              {editedHospital.calle} {editedHospital.numero}, {editedHospital.ciudad}
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Teléfono</Text>
            <Text style={styles.info}>{editedHospital.telefono}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Correo</Text>
            <Text style={styles.info}>{editedHospital.email}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Responsable</Text>
            <Text style={styles.info}>{editedHospital.responsibleName}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Responsable Correo</Text>
            <Text style={styles.info}>{editedHospital.responsibleContact}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#A4161A',
  },
  container: {
    backgroundColor: '#A4161A',
    padding: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F3F4',
    borderRadius: 20,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  info: {
    fontSize: 20,
    color: 'black',
  },
  logoutButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
  logOutImage: {
    width: 30, // Ajusta según tus preferencias
    height: 30, // Ajusta según tus preferencias
  },
});

export default MyProfileHospital;
