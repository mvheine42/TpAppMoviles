import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const TipoDeUsuario = (props: any) => {
  const options = ['Donante', 'Hospital'];
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const isOptionSelected = (option) => {
    return selectedOption === option;
  };

  const handleContinue = () => {
    if (selectedOption === 'Donante') {
      navigation.navigate('SignUpDonante');
    } else if (selectedOption === 'Hospital') {
      navigation.navigate('SignUpHospital');
    }
  };

  const isContinueDisabled = selectedOption === null; // Si no hay opción seleccionada, el botón estará deshabilitado

  return (
    <View style={styles.container}>
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
    fontSize: 45,
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
  disabledButton: {
    backgroundColor: '#A8A8A880',
  },
});