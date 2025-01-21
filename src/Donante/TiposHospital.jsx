import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export const TiposHospital = (props) => {
  const data = [
    {
      id: '1',
      name: 'Donaciones para ti',
    },
    {
      id: '2',
      name: 'Donaciones de Plaquetas',
    },
    {
      id: '3',
      name: 'Donaciones de Médula',
    },
    {
      id: '4',
      name: 'Donaciones de Sangre 0+',
    },
    {
      id: '5',
      name: 'Donaciones de Sangre 0-',
    },
    {
      id: '7',
      name: 'Donaciones de Sangre A+',
    },
    {
      id: '8',
      name: 'Donaciones de Sangre A-',
    },
    {
        id: '9',
        name: 'Donaciones de Sangre B+',
      },
      {
        id: '10',
        name: 'Donaciones de Sangre B-',
      },
  ];

  const colors = [
    'rgb(102, 7, 8)',
    'rgb(164, 22, 26)',
    'rgb(186, 24, 27)',
    'rgb(229, 56, 59)',
    // Add more colors as needed
  ];


  const renderItem = (item, index) => (
    <TouchableOpacity onPress={() => props.navigation.navigate('ListaDeHospitales')}>
      <View style={[styles.item, { backgroundColor: colors[index % colors.length] }]}>
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <ScrollView
        style={styles.columnContainer}
        contentContainerStyle={styles.columnContent}
      >
        {data.map((item, index) => (
          <View style={styles.columnItem} key={item.id}>
            {renderItem(item, index)}
          </View>
        ))}
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
  columnContainer: {
    height: '100%',
    margin: 10,
  },
  columnContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  columnItem: {
    width: '48%',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  itemType: {
    fontSize: 16,
    color: 'gray',
  },
});

export default TiposHospital;
