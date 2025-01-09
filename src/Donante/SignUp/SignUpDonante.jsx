import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const usuarioImage = require('../../../imagenes/usuario-2.png');
const candadoImage = require('../../../imagenes/candado.png');
const correoImage = require('../../../imagenes/correo-electronico.png');
const infoImage = require('../../../imagenes/informacion.png');

export const SignUpDonante = (props) => {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [medicacion, setMedicacion] = useState('');
  const [embarazo, setEmbarazo] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [selectedMedicacion, setSelectedMedicacion] = useState(null);
  const [selectedEmbarazo, setSelectedEmbarazo] = useState(null);
  const [showMedicationInput, setShowMedicationInput] = useState(false);
  const [selectedGenero, setSelectedGenero] = useState(null);

  const handleOptionSelect = (option, question) => {
    if (question === 'embarazo') {
      setSelectedEmbarazo(option);
      setEmbarazo(option);
    } else if (question === 'medicacion') {
      setSelectedMedicacion(option);
      setShowMedicationInput(option === 'Si');
      setMedicacion(option === 'Si' ? medicacion : 'No');
    } else if (question === 'genero') {
      setSelectedGenero(option);
      setGenero(option);
      if (option !== 'Femenino') {
        setSelectedEmbarazo(null);
        setEmbarazo('');
      }
    }
  };

  const isFormComplete = () => {
    return (
      nombre &&
      apellido &&
      email &&
      genero &&
      dni &&
      edad &&
      peso &&
      (selectedMedicacion === 'No' || (selectedMedicacion === 'Si' && medicacion)) &&
      (genero !== 'Femenino' || (selectedEmbarazo !== null)) &&
      password &&
      repeatPassword &&
      password === repeatPassword
    );
  };

  const handleContinue = () => {
    const usuarioData = {
      tipoDeUsuario: props.route.params.tipoDeUsuario,
      nombre,
      apellido,
      dni,
      email,
      genero,
      edad,
      peso,
      medicacion,
      embarazo,
    };
  
    props.navigation.navigate('EligeQueDonar', { usuarioData });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Sign Up</Text>

      <View style={styles.block}>
        <Image source={usuarioImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="white"
          onChangeText={setNombre}
        />
      </View>

      <View style={styles.block}>
        <Image source={usuarioImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="white"
          onChangeText={setApellido}
        />
      </View>

      <View style={styles.block}>
        <Image source={correoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.block}>
        <Image source={usuarioImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="DNI"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={setDni}
        />
      </View>

      <View style={styles.blockPregunta}>
        <View style={styles.questionContainer}>
          <Image source={usuarioImage} style={styles.inputIcon} />
          <Text style={styles.pregunta}>Género</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, selectedGenero === 'Femenino' && styles.selectedOption]}
            onPress={() => handleOptionSelect('Femenino', 'genero')}
          >
            <Text style={styles.optionText}>Femenino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedGenero === 'Masculino' && styles.selectedOption]}
            onPress={() => handleOptionSelect('Masculino', 'genero')}
          >
            <Text style={styles.optionText}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedGenero === 'Otro' && styles.selectedOption]}
            onPress={() => handleOptionSelect('Otro', 'genero')}
          >
            <Text style={styles.optionText}>Otro</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.block}>
        <Image source={usuarioImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={setEdad}
        />
      </View>

      <View style={styles.block}>
        <Image source={infoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Peso"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={setPeso}
        />
      </View>

      <View style={styles.blockPregunta}>
        <View style={styles.questionContainer}>
          <Image source={infoImage} style={styles.inputIcon} />
          <Text style={styles.pregunta}>¿Toma alguna medicación?</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, selectedMedicacion === 'Si' && styles.selectedOption]}
            onPress={() => handleOptionSelect('Si', 'medicacion')}
          >
            <Text style={styles.optionText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedMedicacion === 'No' && styles.selectedOption]}
            onPress={() => handleOptionSelect('No', 'medicacion')}
          >
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>

        {showMedicationInput && (
          <TextInput
            style={styles.input}
            placeholder="Nombre de los medicamentos"
            placeholderTextColor="white"
            onChangeText={setMedicacion}
          />
        )}
      </View>

      {genero === 'Femenino' && (
        <View style={styles.blockPregunta}>
          <View style={styles.questionContainer}>
            <Image source={infoImage} style={styles.inputIcon} />
            <Text style={styles.pregunta}>¿Está embarazada?</Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.optionButton, selectedEmbarazo === 'Si' && styles.selectedOption]}
              onPress={() => handleOptionSelect('Si', 'embarazo')}
            >
              <Text style={styles.optionText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, selectedEmbarazo === 'No' && styles.selectedOption]}
              onPress={() => handleOptionSelect('No', 'embarazo')}
            >
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.block}>
        <Image source={candadoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.block}>
        <Image source={candadoImage} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Repetir Contraseña"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={setRepeatPassword}
        />
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={[styles.continueButton, !isFormComplete() && styles.disabledButton]}
        disabled={!isFormComplete()}
      >
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
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    width: 310,
    alignSelf: 'center'
  },
  blockPregunta: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#BA181B',
    borderRadius: 15,
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
  disabledButton: {
    backgroundColor: '#A8A8A880',
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
    width: '100%',
    marginTop: 12,
  },
  optionButton: {
    backgroundColor: '#A4161A',
    padding: 5,
    borderRadius: 8,
    width: 90,
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