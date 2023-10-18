import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const MyProfileHospital = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PROFILE</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Presionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
