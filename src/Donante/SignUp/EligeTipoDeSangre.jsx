import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const EligeTipoDeSangre = (props) => {

  const usuarioData = props.route.params.usuarioData;

  const options = ['A', 'B', 'AB', 'O'];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const isOptionSelected = (option) => {
    return selectedOption === option;
  };

  const isFormComplete = () => {
    return (
     selectedOption
    );
  };


  const handleContinue = () => {
    const updatedData = {
      ...usuarioData,
      tipoSangre: selectedOption,
    };
    props.navigation.navigate('EligeFactorRH', { usuarioData: updatedData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>¿Cuál es tu tipo de sangre?</Text>

      <View style={styles.row}>
        {options.slice(0, 2).map((option) => (
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
      </View>

      <View style={styles.row}>
        {options.slice(2).map((option) => (
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
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={[styles.continueButton, !isFormComplete() && styles.disabledButton]}
        disabled={!isFormComplete()}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 320,
    marginBottom: 15,
  },
  option: {
    padding: 30,
    borderRadius: 20,
    width: 145,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  optionText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedOption: {
    backgroundColor: 'white',
  },
  selectedOptionText: {
    color: '#A4161A', // Cambio de color al seleccionar
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    marginTop: 15,
    alignItems: 'center',
    width: 270,
    height: 60,
    alignSelf: 'center',
    marginBottom: 35,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#660708',
    textAlign: 'center', // Centra el texto horizontalmente
  },
  disabledButton: {
    backgroundColor: '#A8A8A880',
  },  
});

export default EligeTipoDeSangre;