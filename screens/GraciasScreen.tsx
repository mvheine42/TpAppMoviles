import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { TabScreen } from './TabScreen';

export const GraciasScreen = (props: any) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { opacity }]}>
        <Text style={styles.text}>Gracias por confiar en DonaVida+!</Text>
      </Animated.View>
      <TouchableOpacity onPress={() => props.navigation.navigate(TabScreen)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Ir al inicio</Text>
        </View>
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
  animatedContainer: {
    backgroundColor: 'red', // Cambia el color de fondo a rojo
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'green', // Cambia el color del botón a verde
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default GraciasScreen;
