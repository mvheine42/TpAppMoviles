import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const API_URL = "http://localhost:3000";
export const DonationsScreen = (props) => {
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const userId = props.user.user.id;

  useEffect(() => {
    if (userId) {
      fetch(`${API_URL}/donante/getBenefitById/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setDiscounts(data);
        })
        .catch((error) => {
          console.error('Error fetching benefits:', error);
        });
    }
  }, [userId]);

  const openDiscountDetails = (item) => {
    setSelectedDiscount(item);
  };

  const closeDiscountDetails = () => {
    setSelectedDiscount(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DonaVida+</Text>
      <Text style={styles.heading}>Beneficios y Descuentos</Text>
      {userId ? (
        <FlatList
          data={discounts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openDiscountDetails(item)}>
              <View style={styles.discountItem}>
                <Image source={{ uri: item.imagen }} style={styles.discountImage} />
                <View style={styles.discountOverlay}>
                  <Text style={styles.discountText}>{item.tipoDescuento}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noUserText}>User data not available</Text>
      )}

      <Modal visible={selectedDiscount !== null} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>{selectedDiscount?.nombre}</Text>
            <Text>{selectedDiscount?.tipoDescuento}</Text>
            <Text>{selectedDiscount?.details}</Text>
            <Text>{`Código de descuento: ${selectedDiscount?.codigo}`}</Text>
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
    color: '#A4161A',
  },
  discountItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  discountImage: {
    width: 300,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 8,
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
  noUserText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: 'gray',
  },
});

export default DonationsScreen;
