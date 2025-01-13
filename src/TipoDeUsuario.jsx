import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const TipoDeUsuario = (props) => {
  const options = ['Donante', 'Hospital'];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const isOptionSelected = (option) => {
    return selectedOption === option;
  };

  const handleContinue = () => {
    if (selectedOption === 'Donante') {
      props.navigation.navigate('SignUpDonante');
    } else if (selectedOption === 'Hospital') {
      props.navigation.navigate('SignUpHospital');
    }
  };

  const isContinueDisabled = selectedOption === null; // Si no hay opción seleccionada, el botón estará deshabilitado

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DONAVIDA+</Text>
      <Text style={styles.mainText}>Tipo de Usuario</Text>

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
        onPress={handleContinue}
        style={[styles.continueButton, isContinueDisabled && styles.disabledButton]}
        disabled={isContinueDisabled}
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
    alignItems: 'left',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
    marginTop: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
  },
  mainText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'left',
    marginBottom: 30,
    marginLeft: 10,
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
  },
  option: {
    padding: 30,
    borderRadius: 20,
    width: 290,
    height: 215,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    backgroundColor: 'rgb(164, 22, 27)',
    marginBottom: 25,
  },
  optionText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: '#660708',
  },
  selectedOptionText: {
    color: '#fff',
  },
  continueButton: {
    backgroundColor: '#660708',
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
    color: 'white',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#A8A8A880',
  },
});