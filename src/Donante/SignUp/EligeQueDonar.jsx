import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const plaquetaImage = require('../../../imagenes/plaqueta.png');
const sangreImage = require('../../../imagenes/gota-de-sangre.png');
const medulaImage = require('../../../imagenes/medula-osea.png');

export const EligeQueDonar = (props) => {

  const usuarioData = props.route.params.usuarioData;

  const [donaSangre, setDonaSangre] = useState(false);
  const [donaMedula, setDonaMedula] = useState(false);
  const [donaPlaquetas, setDonaPlaquetas] = useState(false);

  const toggleOption = (option) => {
    switch (option) {
      case 'donaSangre':
        setDonaSangre(!donaSangre);
        break;
      case 'donaMedula':
        setDonaMedula(!donaMedula);
        break;
      case 'donaPlaquetas':
        setDonaPlaquetas(!donaPlaquetas);
        break;
      default:
        break;
    }
  };

  const isFormComplete = () => {
    return (
      donaSangre ||
      donaPlaquetas ||
      donaMedula
    );
  };

  const handleContinue = () => {
    
    const updatedData = {
      ...usuarioData,
      donaSangre,
      donaMedula,
      donaPlaquetas,
    };
    props.navigation.navigate('EligeTipoDeSangre', { usuarioData: updatedData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>¿Qué quieres donar?</Text>

      <TouchableOpacity
        style={[
          styles.option,
          { backgroundColor: donaSangre ? 'white' : 'rgba(255, 255, 255, 0.5)' },
        ]}
        onPress={() => toggleOption('donaSangre')}
      >
        <View style={styles.optionContent}>
          <Image source={sangreImage} style={styles.optionIcon} />
          <Text style={[styles.optionText, { color: donaSangre ? '#A4161A' : 'white' }]}>
            Sangre
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          { backgroundColor: donaMedula ? 'white' : 'rgba(255, 255, 255, 0.5)' },
        ]}
        onPress={() => toggleOption('donaMedula')}
      >
        <View style={styles.optionContent}>
          <Image source={medulaImage} style={styles.optionIcon} />
          <Text style={[styles.optionText, { color: donaMedula ? '#A4161A' : 'white' }]}>
            Médula
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          { backgroundColor: donaPlaquetas ? 'white' : 'rgba(255, 255, 255, 0.5)' },
        ]}
        onPress={() => toggleOption('donaPlaquetas')}
      >
        <View style={styles.optionContent}>
          <Image source={plaquetaImage} style={styles.optionIcon} />
          <Text style={[styles.optionText, { color: donaPlaquetas ? '#A4161A' : 'white' }]}>
            Plaquetas
          </Text>
        </View>
      </TouchableOpacity>

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
  disabledButton: {
    backgroundColor: '#A8A8A880',
  },  
});