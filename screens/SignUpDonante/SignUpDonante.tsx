import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const usuarioImage = require('../imagenes/usuario-2.png');
const candadoImage = require('../imagenes/candado.png');
const correoImage = require('../imagenes/correo-electronico.png');
const infoImage = require('../imagenes/informacion.png');

export const SignUpDonante = (props:any) => {
  const [selectedEmbarazo, setSelectedEmbarazo] = useState(null);
  const [selectedMedicacion, setSelectedMedicacion] = useState(null);
  const [showMedicationInput, setShowMedicationInput] = useState(false);

  const handleOptionSelect = (option: any, question: any) => {
    if (question === 'embarazo') {
      setSelectedEmbarazo(option);
    } else if (question === 'medicacion') {
      setSelectedMedicacion(option);
      setShowMedicationInput(option === 'Si');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Sing Up</Text>

      <View style={styles.block}>
        <Image source={usuarioImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="white"
        />
      </View>

      <View style={styles.block}>
        <Image source={usuarioImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="white"
        />
      </View>

      <View style={styles.block}>
        <Image source={correoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="white"
        />
      </View>

      <View style={styles.block}>
        <Image source={usuarioImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Género"
          placeholderTextColor="white"
        />
      </View>

      <View style={styles.block}>
        <Image source={usuarioImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor="white"
        />
      </View>

      <View style={styles.block}>
        <Image source={infoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Peso"
          placeholderTextColor="white"
        />
      </View>

      <View style={styles.blockPregunta}>
        <View style={styles.questionContainer}>
          <Image source={infoImage} style={styles.inputIcon} />
          <Text style={styles.pregunta}>¿Toma alguna medicación?</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedMedicacion === 'Si' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Si', 'medicacion')}
          >
            <Text style={styles.optionText}>Sí</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedMedicacion === 'No' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('No', 'medicacion')}
          >
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>

        {showMedicationInput && (
          <View style={styles.inputBlock}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del medicamento"
              placeholderTextColor="white"
            />
          </View>
        )}
      </View>

      <View style={styles.blockPregunta}>
        <View style={styles.questionContainer}>
          <Image source={infoImage} style={styles.inputIcon} />
          <Text style={styles.pregunta}>Posibilidad de Embarazo</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedEmbarazo === 'Si' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Si', 'embarazo')}
          >
            <Text style={styles.optionText}>Sí</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedEmbarazo === 'No' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('No', 'embarazo')}
          >
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.block}>
        <Image source={candadoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="white"
        />
      </View>

      <View style={styles.block}>
        <Image source={candadoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Repetir Contraseña"
          placeholderTextColor="white"
        />
      </View>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('EligeTipoDeSangre')}
        style={styles.continueButton}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    marginTop: 25,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#A4161A',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BA181B',
    borderRadius: 35,
    padding: 10,
    marginBottom: 15,
    width: 310,
    alignSelf: 'center'
  },
  blockPregunta: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#BA181B',
    borderRadius: 45,
    padding: 10,
    marginBottom: 15,
    width: 310,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 8
  },
  continueButton: {
    backgroundColor: '#660708',
    borderRadius: 25,
    padding: 15,
    marginTop: 2,
    alignItems: 'center',
    width: 270,
    alignSelf: 'center',
    marginBottom: 35
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pregunta: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
    marginTop: 12,
  },
  optionButton: {
    backgroundColor: '#A4161A',
    padding: 10,
    borderRadius: 8,
    width: 80,
    color: 'white',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: 'white',
    color: '#A4161A',
  },
  inputBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BA181B',
    borderRadius: 35,
    padding: 10,
    width: 310,
    alignSelf: 'center'
  },
});