import React from "react"
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, Modal, ScrollView , StyleSheet, FlatList } from "react-native"
import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

const API_URL = "http://localhost:3000";
const image = 'https://thumbs.dreamstime.com/b/icono-del-logotipo-hospital-135146804.jpg';

function calcularDistancia(lat1, lon1, lat2, lon2) { //fun de chatgpt para calcular la distancia en kms
    const degreesToRadians = (degrees) => {
        return degrees * (Math.PI / 180);
    }
      
    const EARTH_RADIUS = 6371; // Radio de la Tierra en kilómetros
      
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * 
                Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2));
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = EARTH_RADIUS * c; // Distancia en kilómetros
    
    return distancia;
    }

requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])
.then((status) => {
  console.log('Location', status[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])
})


Geolocation.setRNConfiguration({
  skipPermissionRequests: true,
  authorizationLevel: 'whenInUse',
  locationProvider: 'auto' 

})


const Home = (props) => {
    const [position, setPosition] = useState(null);
    const [distancia, setDistancia] = useState(null);
    const [pedidos, setPedidos] = useState([]);

    React.useEffect(() => {      
      fetchPedidos();
    }, []);
    
    const categories = pedidos.length > 0 ? Array.from(new Set(pedidos.map((item) => item.tipoDonacion))) : [];

    const fetchPedidos = async () => {
      let pedidos = await fetch(`${API_URL}/donante/getHospitalOrdersFor/${props.user.user.id}`);
      pedidos = await pedidos.json();
      setPedidos(pedidos);
    }


    useEffect(() => {
      const handleGetCurrentPosition = () => {
        Geolocation.getCurrentPosition(
          (pos) => {
            setPosition(pos);
          },
          (error) => {
            console.log(error);
          },
          { enableHighAccuracy: true, maximumAge: 100 }
        );
      };
  
      handleGetCurrentPosition();
  
    }, []);
  
    useEffect(() => {
      if (position) {
        const destino = {} ; // esto es lo q necesitamos de los htales. 
        const distanciaCalculada = calcularDistancia(position.coords.latitude, position.coords.longitude, destino.latitude, destino.longitude);
        setDistancia(distanciaCalculada);
      }
    }, [position]);

    const initialCategories = [];
    if (props.user.user.donaSangre) initialCategories.push("Sangre");
    if (props.user.user.donaPlaquetas) initialCategories.push("Plaquetas");
    if (props.user.user.donaMedula) initialCategories.push("Médula");

    const [selectedCategories, setSelectedCategories] = useState(initialCategories);

    const toggleCategory = (category) => {
      setSelectedCategories((prevCategories) => {
          if (prevCategories.includes(category)) {
              // Evitar que todas se deseleccionen
              if (prevCategories.length === 1) return prevCategories;
              return prevCategories.filter((c) => c !== category);
          } else {
              return [...prevCategories, category];
          }
      });
  };
  
    const filteredData = pedidos.length > 0
    ? pedidos.filter((item) => selectedCategories.includes(item.tipoDonacion))
    : [];
  

    const handleHospitalPress = (hospital) => {
      props.navigation.navigate('HospitalDonante', { pedidoHospital: hospital});
    };

    const renderItem = ({ item }) => {
      const distancia = position
        ? calcularDistancia(
            position.coords.latitude,
            position.coords.longitude,
            item.hospital.latitude,
            item.hospital.longitude
          )
        : null;

      return (
        <TouchableOpacity onPress={() => handleHospitalPress(item)}>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.tipoDonacion === 'Sangre' 
                ? `${item.tipoDonacion}: ${item.tipoSangre} ${item.factorRh}` 
                : item.tipoDonacion}
            </Text>
            <View style={styles.itemContent}>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemInfoTextHospital}>{item.hospital.nombre}</Text>
                <Image source={{ uri: image }} style={styles.itemImage} />
                <Text style={styles.itemInfoText}>
                  Ubicado a {distancia ? distancia.toFixed(2) : 'Cargando...'} km de tu ubicación actual
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
  
    const [showModal, setShowModal] = useState(false);
  
    const fechaDonacion = new Date('2023-11-17');
    const fechaActual = new Date();
    const tiempoRestante = Math.ceil((fechaDonacion - fechaActual) / (1000 * 60 * 60 * 24)); // Diferencia en días
  
    const closeCountdown = () => {
      setShowModal(false);
    };
  
    useEffect(() => {
      if (showModal) {
        const timer = setInterval(() => {
          closeCountdown();
        }, tiempoRestante * 24 * 60 * 60 * 1000);
  
        return () => {
          clearInterval(timer);
        };
      }
    }, [showModal, tiempoRestante]);


    

    return (
      <View style={styles.container}>
        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
          onRequestClose={closeCountdown}
        >
          <TouchableWithoutFeedback onPress={closeCountdown}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>¡Bienvenido!</Text>
                <Text style={styles.countdownText}>{`Faltan ${tiempoRestante} días para poder donar`}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

        </Modal>
        
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ flexGrow: 1 }} 
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
          <Text style={styles.title}>DonaVida+</Text>
          </View>
          <View style={styles.tituloNoticias}>
            <Text style={styles.noticiasText}>DONACIONES</Text>
            <Text style={styles.noticiaSubBText}>Hecho especialmente para tí</Text>
          </View>
          <View style={styles.categoryButtons}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={
                  selectedCategories.includes(category)
                    ? styles.selectedCategoryButton
                    : styles.categoryButton
                }
                onPress={() => toggleCategory(category)}
              >
                <Text
                  style={
                    selectedCategories.includes(category)
                      ? styles.selectedCategoryButtonText
                      : styles.categoryButtonText
                  }
                  >
                    {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.content}>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              contentContainerStyle={styles.flatlistContent}
            />
          </View>
          <View style={styles.informacion}>
            <Text style={styles.informacionText}>Información</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('Requerimientos')}
            >
              <Text style={styles.buttonText}>Requerimientos para donar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('Proceso')}
            >
              <Text style={styles.buttonText}>Cómo es el proceso</Text>
            </TouchableOpacity>
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
    tituloNoticias: {
      alignItems: 'left',
      justifyContent: 'left',
      padding: '3%',
      marginHorizontal: '2%'
    },
    noticiasText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#A4161A',
      textShadowColor: 'rgba(164, 22, 27, 0.4)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    },
    categoryButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
      marginHorizontal: '3%'
    },
    categoryButton: {
      backgroundColor: '#fff', 
      borderRadius: 10,
      paddingVertical: 15,
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'darkred',
    },
    selectedCategoryButton: {
      backgroundColor: '#BA181B', 
      borderRadius: 10,
      paddingVertical: 15,
      flex: 1, 
      marginHorizontal: 5,
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'darkred', 
    },
    categoryButtonText: {
      color: '#BA181B', 
      fontWeight: 'bold',
    },
    selectedCategoryButtonText: {
      color: '#fff', 
      fontWeight: 'bold',
    },
    content: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '2%'
    },
    informacion: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      width: '100%',
    },
    informacionText: {
      color: '#A4161A',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: '2%'
    },
    item: {
      width: 190,
      height: 270,
      backgroundColor: '#A4161A',
      margin: 10,
      borderRadius: 8,
      borderWidth: 3,
      borderColor: 'darkred',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 5,
      alignItems: 'left',
    },
    itemContent: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    itemTextContainer: {
      justifyContent: 'center',
      textAlign: 'center',
    },
    itemText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      textShadowColor: 'rgba(0, 0, 0, 0.32)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
      padding: 10,
      marginLeft: '3%'
    },
    flatlistContent: {
      flexGrow: 1,
    },
    button: {
      backgroundColor: '#BA181B',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginVertical: 5,
      width: '90%',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: 'darkred',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    itemImage: {
      width: '100%',     
      aspectRatio: 1.8, 
      marginVertical: 5,
      resizeMode: 'cover', 
    },
    noticiaSubBText:{
      fontSize: 22,
      fontWeight: 'bold',
      color: '#A4161A'
    },
    itemInfoText:{
      color: 'white',
      textAlign: 'left',
      fontSize: 14,
      margin: 8
    },
    itemInfoTextHospital:{
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: 'darkred',
      alignItems: 'center',
    },
    modalText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#A4161A',
      marginBottom: 20,
    },
    countdownText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#A4161A',
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: '#BA181B',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 3,
      borderColor: 'darkred',
    },
    closeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default Home