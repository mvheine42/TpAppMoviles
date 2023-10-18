import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const MyProfile = (props: any) => {
  // Supongamos que tienes la fecha de la última donación en milisegundos
  const lastDonationDate = 1633890000000; // Fecha de ejemplo en milisegundos

  // Calcula la cantidad de tiempo desde la última donación en días
  const currentDate = new Date().getTime();
  const daysSinceLastDonation = Math.floor(
    (currentDate - lastDonationDate) / (1000 * 60 * 60 * 24)
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <Text style={styles.infoText}>
        Tiempo desde la última donación: {daysSinceLastDonation} días
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinea el contenido en la parte superior
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'rgb(229, 56, 59)',
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
