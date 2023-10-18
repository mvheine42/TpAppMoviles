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
  tituloRequerimientos: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 10,
  },
  RequerimientosText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'rgb(229, 56, 59)',
  },
  iconContainer: {
    backgroundColor: 'rgb(229, 56, 59)',
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
