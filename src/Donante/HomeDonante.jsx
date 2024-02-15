import React from "react"
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native"
import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';


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

    useEffect(() => {
        const handleGetCurrentPosition = () => {
          Geolocation.getCurrentPosition(
            (pos) => {
              console.log(pos);
              setPosition(pos);
            },
            (error) => {
              console.log(error);
            },
            { enableHighAccuracy: true, maximumAge: 100 }
          );
        };
    
        handleGetCurrentPosition();
    
      }, []); // Se ejecuta solo al montar el componente
    
      useEffect(() => {
        // Calcular la distancia cuando la posición y la posición del destino estén disponibles
        if (position) {
          const destino = { latitude: 40.7128, longitude: -74.0060 }; // esto es lo q necesitamos de los htales. 
          const distanciaCalculada = calcularDistancia(position.coords.latitude, position.coords.longitude, destino.latitude, destino.longitude);
          setDistancia(distanciaCalculada);
        }
      }, [position]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>DonaVida+</Text>
            </View>
            <View style={styles.tituloNoticias}>
                <Text style={styles.noticiasText}>DONACIONES</Text>
                <Text style={styles.noticiaSubBText}>Hecho especialmente para {props.userId.nombre}</Text>
            </View>
            <View style={styles.informacion}>
                <Text style={styles.informacionText}>Información</Text>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Requerimientos')}>
                    <Text style={styles.buttonText}>Requerimientos para donar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Proceso')}>
                    <Text style={styles.buttonText}>Cómo es el proceso</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
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
      alignItems: 'center',
      justifyContent: 'center',
      margin: '3%',
  
    },
    noticiasText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#A4161A',
      textShadowColor: 'rgba(164, 22, 26, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    },
    categoryButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    categoryButton: {
      backgroundColor: '#BA181B',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginHorizontal: 5,
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'darkred',
    },
    selectedCategoryButton: {
      backgroundColor: 'darkred',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginHorizontal: 5,
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'darkred',
    },
    categoryButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    content: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
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
    },
    item: {
      width: 190,
      height: 200,
      backgroundColor: '#A4161A',
      margin: 10,
      borderRadius: 20,
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
      alignItems: 'center',
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
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
      margin: 3,
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
      borderWidth: 3,
      borderColor: 'darkred',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    itemImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#660708',
    },
    noticiaSubBText:{
      fontSize: 22,
      fontWeight: 'bold',
      color: '#A4161A'
    },
    itemInfoText:{
      marginHorizontal:20,
      color: 'white',
      textAlign: 'center',
      fontSize: 14,
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