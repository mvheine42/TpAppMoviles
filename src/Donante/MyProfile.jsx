import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const profileImage = require('../../imagenes/icons8-circled-user-female-skin-type-4-100.png');
const logOutImage = require('../../imagenes/icons8-logout-100-2.png');

const API_URL = "http://localhost:3000";

export const MyProfile = (props) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);

  const fieldsToShow = ['nombre', 'apellido', 'email', 'edad', 'peso', 'medicaciones', 'embarazo'];


  useEffect(() => {
    const fetchLastDonation = async () => {
      try {
        const response = await fetch(`${API_URL}/donante/getLastAssistedTurnByDonante/${props.user.user.id}`);
        const data = await response.json();
  
        if (Array.isArray(data)) {
          if (data.length > 0 && data[0].fecha) {
            setLastDonation(data[0].fecha);
          } else {
            setLastDonation(null);
          }
        } else if (data && data.fecha) {
          setLastDonation(data.fecha);
        } else {
          setLastDonation(null);
        }
      } catch (error) {
        console.error('Error fetching donation data:', error);
        setLastDonation(null);
      }
    };
  
    fetchLastDonation();
  }, [props.user.user.id]);

  const calculateTimeSinceDonation = () => {
    if (!lastDonation) return 'No donation found yet';
    
    const lastDonationDate = new Date(lastDonation);
    if (isNaN(lastDonationDate.getTime())) {
      return 'Invalid date';
    }
    
    const now = new Date();
    
    const diffInMilliseconds = now - lastDonationDate;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    const years = now.getFullYear() - lastDonationDate.getFullYear();
    const months = now.getMonth() - lastDonationDate.getMonth();
    const days = now.getDate() - lastDonationDate.getDate();
    
    let adjustedMonths = months;
    let adjustedYears = years;
  
    if (adjustedMonths < 0) {
      adjustedMonths += 12;
      adjustedYears -= 1;
    }
    
    let adjustedDays = days;
    if (adjustedDays < 0) {
      const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      adjustedDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate() - lastDonationDate.getDate() + now.getDate();
    }
  
    return `${adjustedYears} años, ${adjustedMonths} meses y ${adjustedDays} días`;
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => props.logOut()}
          disabled={loggingOut}
        >
          <Image source={logOutImage} style={styles.logOutImage} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <View style={styles.imageWrapper}>
            <Image source={profileImage} style={styles.perfilImage} />
          </View>
        </View>
        <Text style={styles.perfilName}>{props.user.user.nombre} {props.user.user.apellido}</Text>
      </View>

      <ScrollView style={styles.content}>
        {fieldsToShow.map(field => (
          props.user.user[field] !== undefined && props.user.user[field] !== null && (
            <View key={field} style={styles.fieldContainer}>
              <Text style={styles.label}>
                {field === 'nombre' ? 'Nombre' :
                field === 'apellido' ? 'Apellido' :
                field === 'email' ? 'Correo' :
                field === 'edad' ? 'Edad' :
                field === 'peso' ? 'Peso' :
                field === 'medicaciones' ? 'Medicación' :
                field === 'embarazo' ? 'Probabilidad de embarazo' : ''}:
              </Text>
              <Text>
                {field === 'embarazo' 
                  ? (props.user.user[field] ? 'Sí' : 'No') 
                  : props.user.user[field]
                }
              </Text>
            </View>
          )
        ))}
      </ScrollView>

      <View style={styles.timeSinceDonation}>
        {lastDonation ? (
          <Text style={styles.label}>Tiempo desde la última donación: {calculateTimeSinceDonation()}</Text>
        ) : (
          <Text style={styles.label}>Todavía no has realizado ninguna donación</Text>
        )}
      </View>

      <TouchableOpacity onPress={() => props.navigation.navigate('HistoryDonation')}>
        <View style={styles.historyBenefits}>
          <Text style={styles.historyBenefitsText}>Beneficios</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    height: '100%',
    backgroundColor: '#A4161A',
    position: 'relative',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A4161A',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 15,
    position: 'relative', 
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 100,
    height: 100,
    backgroundColor: '#D3D3D3',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 40,
  },
  perfilImage: {
    width: 100,
    height: 100,
  },
  perfilName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#660708',
    marginTop: 50, 
    backgroundColor: '#F5F3F4',
    borderRadius: 10,
    padding: 5,
    textAlign: 'center',
    width: '100%',
  },
  content: {
    backgroundColor: '#F5F3F4',
    borderRadius: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  fieldContainer: {
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  timeSinceDonation: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#F5F3F4', 
    padding: 10, 
    borderRadius: 10, 
    alignItems: 'center',
  },
  historyBenefits: {
    backgroundColor: '#F5F3F4', 
    borderRadius: 10, 
    padding: 15, 
    alignItems: 'center', 
  },
  historyBenefitsText: {
    color: 'black', 
    fontWeight: 'bold', 
    fontSize: 20,
  },   
  logoutButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
  logOutImage: {
    width: 30, 
    height: 30, 
  },
});

export default MyProfile;