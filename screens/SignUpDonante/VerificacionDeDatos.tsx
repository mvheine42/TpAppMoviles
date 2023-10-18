import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const VerificacionDeDatos = (props:any) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const nombre = 'Camila Plaza';
  const tipoSangre = 'A+';

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Información</Text>

      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>Nombre:</Text>
        <Text style={styles.infoValue}>{nombre}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>Tipo de Sangre:</Text>
        <Text style={styles.infoValue}>{tipoSangre}</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
          {isChecked && <Text style={styles.checkboxText}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Verifiqué los datos</Text>
      </View>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('TabScreen')}
        style={[styles.continueButton, !isChecked && styles.disabledButton]}
        disabled={!isChecked}
      >
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
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
});