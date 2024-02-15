import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabScreen } from './TabScreen';

const GraciasScreen = () => {
  const navigation = useNavigation();

  const circleScaleValue = useRef(new Animated.Value(1)).current;
  const imageScaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const navigateToNextScreen = () => {
      navigation.navigate(TabScreen);
    };

    const animationDuration = 5000; // 5 seconds

    Animated.parallel([
      Animated.timing(circleScaleValue, {
        toValue: 2,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(imageScaleValue, {
        toValue: 1.5,
        duration: 1980,
        useNativeDriver: false,
      }),
    ]).start();

    const timeoutId = setTimeout(navigateToNextScreen, animationDuration);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  const animatedCircleStyle = {
    transform: [{ scale: circleScaleValue }],
  };

  const animatedImageStyle = {
    transform: [{ scale: imageScaleValue }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.animation}>
        <Animated.View style={[styles.circle, animatedCircleStyle]} />
        <Animated.Image
          source={require('../../imagenes/icons8-check-100.png')}
          style={[styles.image, animatedImageStyle]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Turno reservado con éxito!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D3D3D3',

    zIndex: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: 2,
  },
  textContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default GraciasScreen;