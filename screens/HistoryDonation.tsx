import React, { useState } from 'react';
import { View, ScrollView, Text, FlatList, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const DonationsScreen = () => {
  const [donationHistory, setDonationHistory] = useState([
    { id: 1, date: '01/01/2023', location: 'Hospital A', donationType: 'Sangre 0+' },
    { id: 2, date: '02/15/2023', location: 'Clinica B', donationType: 'Plaquetas' },
    { id: 3, date: '01/01/2023', location: 'Hospital A', donationType: 'Sangre 0+' },
    { id: 4, date: '01/01/2023', location: 'Hospital A', donationType: 'Sangre 0+' },
    { id: 5, date: '01/01/2023', location: 'Hospital A', donationType: 'Sangre 0+' },
    // Agrega más datos según sea necesario
  ]);

  const [discounts, setDiscounts] = useState([
    { id: 1, name: 'La Parolaccia', image: require('./imagenes/468c5d82ce5a6d1c23a90a3c3a6c0996.jpg'), discount: '30%', details: '30% de descuento en toda la carta', discountCode: 'A2WER34' },
    { id: 2, name: 'Megatlon', image: require('./imagenes/logo-01-e1507801775879.jpg.webp'), discount: '20%', details: '20% de descuento en la membresía mensual', discountCode: 'B1CDF45' },
    { id: 3, name: 'La Bisteca', image: require('./imagenes/images.png'), discount: '30%', details: '30% de descuento en toda la carta', discountCode: 'A2WER34' },
    // Agrega más datos según sea necesario
  ]);

  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const openDiscountDetails = (item) => {
    setSelectedDiscount(item);
  };

  const closeDiscountDetails = () => {
    setSelectedDiscount(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DonaVida+</Text>
      <Text style={styles.heading}>Historial de Donaciones</Text>
      <ScrollView style={styles.section}>
        <FlatList
          data={donationHistory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.donationItem}>
              <Text>{`Fecha: ${item.date}`}</Text>
              <Text>{`Ubicación: ${item.location}`}</Text>
              <Text>{`Tipo de Donación: ${item.donationType}`}</Text>
            </View>
          )}
        />
      </ScrollView>
      <Text style={styles.heading}>Beneficios y Descuentos</Text>
      <ScrollView style={styles.section}>
        <FlatList
          data={discounts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openDiscountDetails(item)}>
              <View style={styles.discountItem}>
                <Image source={item.image} style={styles.discountImage} />
                <View style={styles.discountOverlay}>
                  <Text style={styles.discountText}>{item.discount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      <Modal visible={selectedDiscount !== null} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>{selectedDiscount?.name}</Text>
            <Text>{selectedDiscount?.details}</Text>
            <Text>{`Código de descuento: ${selectedDiscount?.discountCode || 'N/A'}`}</Text>
            <TouchableOpacity onPress={closeDiscountDetails}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
    textShadowColor: '#A4161A',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 16,
  },
  donationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  discountItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  discountImage: {
    width: 200,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  discountOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'right',
  },
});

export default DonationsScreen;
