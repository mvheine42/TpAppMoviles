import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const Hospital = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <Text style={styles.subtitle}>Hospital</Text>
      <Image
        source={require('./imagenes/Untitled.png')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.donarButton} onPress={() => props.navigation.navigate('QuieroDonar')}>
        <Text style={styles.donarButtonText}>Quiero donar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'rgb(229, 56, 59)',
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: '85%',
    height: '35%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  donarButton: {
    backgroundColor: 'rgb(229, 56, 59)',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  donarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Hospital;
