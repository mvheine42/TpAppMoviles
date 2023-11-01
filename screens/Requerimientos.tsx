import React from 'react';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native';


const Requerimientos = () => {
    const data = [
      { id: '1', source: require('./imagenes/business-people.png'), text: 'Tener entre 16 y 65 años' },
      { id: '2', source: require('./imagenes/bascula.png'), text: 'Pesar mas de 50K' },
      { id: '3', source: require('./imagenes/sangre.png'), text: '2 meses desde ultima donacion' },
      { id: '4', source: require('./imagenes/dormir.png'), text: 'dormir mas de 6 horas' },
      { id: '5', source: require('./imagenes/plato.png'), text: 'Desayunar/Almorzar' },
      { id: '6', source: require('./imagenes/tatuaje.png'), text: '6 meses desde ultimo tatuaje' },
    ];
  
    const renderItem = ({ item }) => (
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Image source={item.source} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.iconText}>{item.text}</Text>
          </View>
        </View>
      );
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>DonaVida+</Text>
        </View>
        <View style={styles.tituloRequerimientos}>
          <Text style={styles.RequerimientosText}>REQUERIMIENTOS</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.iconContainer}
        />
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
  tituloRequerimientos: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 10,
  },
  RequerimientosText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  iconContainer: {
    backgroundColor: '#A4161A',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 50,
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 5,
    borderWidth: 0,
  },
  image: {
    width: 80,  
    height: 80, 
    resizeMode: 'contain', 
    alignSelf: 'center', 
    marginTop: 15,
  },
  iconText: {
    marginTop: 5,
    textAlign: 'center', 
    color: 'white', 
    fontSize: 14, 
  },
  textContainer: {
    width: 110, 
    alignItems: 'center', 
  },
  circleContainer:{
    alignItems: 'center',
    marginBottom: 15,
  },
  bottomTabContainer: {
    backgroundColor: '#f2f2f2', 
    height: 60, 
  },
});

export default Requerimientos;
