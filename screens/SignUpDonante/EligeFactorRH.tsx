import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const masImage = require('../imagenes/mas.png');
const menosImage = require('../imagenes/menos.png');

export const EligeFactorRH = (props: any) => {
  const options = ['+', '-'];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const isOptionSelected = (option) => {
    return selectedOption === option;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>¿Qué factor RH eres?</Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            isOptionSelected(option) && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(option)}
        >
          <Text style={[styles.optionText, isOptionSelected(option) && styles.selectedOptionText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => props.navigation.navigate('VerificacionDeDatos')}
        style={styles.continueButton}
      >
        <Text style={styles.buttonText}>Continuar</Text>
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
  option: {
    padding: 30,
    borderRadius: 20,
    width: 270,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 90,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: 'white',
  },
  selectedOptionText: {
    color: '#A4161A',
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    width: 270,
    height: 60,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 35,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#660708',
    textAlign: 'center',
  },
});