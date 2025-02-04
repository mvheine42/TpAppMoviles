import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export const TiposHospital = (props) => {
  const data = [
    { id: '1', name: 'Donaciones para ti', tipo: null},
    { id: '2', name: 'Donaciones de Plaquetas', tipo: 'Plaquetas' },
    { id: '3', name: 'Donaciones de Médula', tipo: 'Médula' },
    { id: '4', name: 'Donaciones de Sangre 0+', tipo: 'Sangre', Sangre: 'O', rh: '+' },
    { id: '5', name: 'Donaciones de Sangre 0-', tipo: 'Sangre', Sangre: 'O', rh: '-' },
    { id: '7', name: 'Donaciones de Sangre A+', tipo: 'Sangre', Sangre: 'A', rh: '+' },
    { id: '8', name: 'Donaciones de Sangre A-', tipo: 'Sangre', Sangre: 'A', rh: '-' },
    { id: '9', name: 'Donaciones de Sangre B+', tipo: 'Sangre', Sangre: 'B', rh: '+' },
    { id: '10', name: 'Donaciones de Sangre B-', tipo: 'Sangre', Sangre: 'B', rh: '-' },
  ];

  const colors = ['rgb(102, 7, 8)', 'rgb(164, 22, 26)', 'rgb(186, 24, 27)', 'rgb(229, 56, 59)'];

  const handlePress = (item) => {
    let params = {
      tipoDonacion: null,
      tipoSangre: null,
      factorRh: null,
    };
  
    if (item.tipo === 'Plaquetas' || item.tipo === 'Médula') {
      params.tipoDonacion = item.tipo;
    } else if (item.tipo === 'Sangre') {
      params.tipoDonacion = 'Sangre';
      params.tipoSangre = item.Sangre;
      params.factorRh = item.rh;
    }
  
    props.navigation.navigate('HospitalesDonante', params);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => handlePress(data[0])}>
          <View style={[styles.fullItem, { backgroundColor: colors[0] }]}> 
            <Text style={styles.itemTitle}>{data[0].name}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.gridContainer}>
          {data.slice(1).map((item, index) => (
            <TouchableOpacity key={item.id} onPress={() => handlePress(item)}>
              <View style={[styles.item, { backgroundColor: colors[(index + 1) % colors.length] }]}> 
                <Text style={styles.itemTitle}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '14%',
    backgroundColor: 'rgb(245, 243, 244)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    position: 'relative',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
    textShadowColor: '#A4161A',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  content: {
    padding: 10,
  },
  fullItem: {
    width: '100%',
    height: 100,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: 190,
    height: 120,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default TiposHospital;
