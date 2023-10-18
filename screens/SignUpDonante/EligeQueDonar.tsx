import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const plaquetaImage = require('../imagenes/plaqueta.png');
const sangreImage = require('../imagenes/gota-de-sangre.png');
const medulaImage = require('../imagenes/medula-osea.png');

export const EligeQueDonar = (props:any) => {
  const options = [
    { label: 'Sangre', image: sangreImage },
    { label: 'Médula', image: medulaImage },
    { label: 'Plaquetas', image: plaquetaImage },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option.label)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option.label));
    } else {
      setSelectedOptions([...selectedOptions, option.label]);
    }
  };

  const isOptionSelected = (option) => {
    return selectedOptions.includes(option.label);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>¿Qué quieres donar?</Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.label}
          style={[
            styles.option,
            {
              backgroundColor: isOptionSelected(option) ? 'white' : 'rgba(255, 255, 255, 0.5)',
            },
          ]}
          onPress={() => toggleOption(option)}
        >
          <View style={styles.optionContent}>
            <Image source={option.image} style={styles.optionIcon} />
            <Text
              style={[
                styles.optionText,
                { color: isOptionSelected(option) ? '#A4161A' : 'white' },
              ]}
            >
              {option.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

    <TouchableOpacity
      onPress={() => props.navigation.navigate('EligeTipoDeSangre')} // Movido el onPress a esta View
      style={styles.continueButton} >
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
    marginBottom: 20,
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
  },
  option: {
    padding: 20,
    borderRadius: 50,
    marginTop: 20,
    width: 290,
    height: 110,
    alignItems: 'flex-start',
    justifyContent: 'center',
    
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginLeft:10,
    marginRight: 18,
    width: 45,
    height: 45,
  },
  optionText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    marginTop: 40,
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
    textAlign: 'center',
  },  
});