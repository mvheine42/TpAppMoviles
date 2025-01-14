import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export const VerificacionDeDatosHospital = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };
  const [loading, setLoading] = useState(false);

  const usuarioData = props.route.params.usuarioData;
  
  const crearCuenta = async () => {
      setLoading(true);
      console.log('USUARIO: ', JSON.stringify(usuarioData));
      try {
        const response = await fetch('http://localhost:3000/hospital/postHospital', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuarioData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Error al crear la cuenta');
        } else {
          const data = await response.json();
          Alert.alert('Éxito', 'Cuenta creada correctamente');
          props.navigation.navigate('Login');
          }
      } catch (error) {
        console.error('Error al hacer el POST:', error);
        Alert.alert('Error', 'Error interno del servidor');
      } finally {
        setLoading(false);
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.mainText}>Información de Verificación</Text>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Nombre:</Text>
          <Text style={styles.infoValue}>{usuarioData.nombre || 'N/A'}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Teléfono:</Text>
          <Text style={styles.infoValue}>{usuarioData.telefono || 'N/A'}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{usuarioData.email || 'N/A'}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Nombre del Responsable:</Text>
          <Text style={styles.infoValue}>{usuarioData.responsibleName || 'N/A'}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Correo del Responsable:</Text>
          <Text style={styles.infoValue}>{usuarioData.responsibleContact || 'N/A'}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Dirección:</Text>
          <Text style={styles.infoValue}>{usuarioData.calle + ' ' + usuarioData.numero + ', ' + usuarioData.ciudad + ', ' + usuarioData.provincia + ', ' + usuarioData.pais || 'N/A'}</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
            {isChecked && <Text style={styles.checkboxText}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Verifiqué los datos</Text>
        </View>

     <TouchableOpacity
        onPress={crearCuenta}
        style={[styles.continueButton, (!isChecked || loading) && styles.disabledButton]}
        disabled={!isChecked || loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Crear Cuenta'}</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#A4161A',
  },
  mainText: {
    marginTop: 25,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
  },
  infoBlock: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  infoValue: {
    fontSize: 24,
    color: '#A4161A',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  checkbox: {
    borderColor: 'white',
    borderWidth: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 24,
    color: 'white',
  },
  checkboxLabel: {
    fontSize: 20,
    color: 'white',
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    width: 270,
    height: 60,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 35,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#660708',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  scrollContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
  },
});