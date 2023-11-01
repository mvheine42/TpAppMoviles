import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';

const data = [
  { id: '1', text: 'SANGRE 0+', category: 'Sangre', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hospital_Británico_Central_%28fachada%29.jpg/1200px-Hospital_Británico_Central_%28fachada%29.jpg'},
  { id: '2', text: 'PLAQUETAS', category: 'Plaquetas', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hospital_Británico_Central_%28fachada%29.jpg/1200px-Hospital_Británico_Central_%28fachada%29.jpg'},
  { id: '3', text: 'MEDULA', category: 'Médula', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hospital_Británico_Central_%28fachada%29.jpg/1200px-Hospital_Británico_Central_%28fachada%29.jpg'},
  { id: '4', text: 'SANGRE 0+', category: 'Sangre', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hospital_Británico_Central_%28fachada%29.jpg/1200px-Hospital_Británico_Central_%28fachada%29.jpg'},
  { id: '5', text: 'PLAQUETAS', category: 'Plaquetas', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hospital_Británico_Central_%28fachada%29.jpg/1200px-Hospital_Británico_Central_%28fachada%29.jpg'},
  { id: '6', text: 'MEDULA', category: 'Médula', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hospital_Británico_Central_%28fachada%29.jpg/1200px-Hospital_Británico_Central_%28fachada%29.jpg'},
  { id: '7', text: 'SANGRE 0+', category: 'Sangre', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hospital_Británico_Central_%28fachada%29.jpg/1200px-Hospital_Británico_Central_%28fachada%29.jpg'},
  { id: '8', text: 'PLAQUETAS', category: 'Plaquetas', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hospital_Británico_Central_%28fachada%29.jpg/1200px-Hospital_Británico_Central_%28fachada%29.jpg'},
  { id: '9', text: 'MEDULA', category: 'Médula', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hospital_Británico_Central_%28fachada%29.jpg/1200px-Hospital_Británico_Central_%28fachada%29.jpg'},
];

const categories = Array.from(new Set(data.map((item) => item.category)));

interface Item {
  id: string;
  text: string;
  category: string;
}

export const Home = (props: any) => {
  const [selectedCategories, setSelectedCategories] = useState(['Sangre']);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const filteredData = data.filter((item) =>
    selectedCategories.includes(item.category)
  );

  const navigateToAnotherScreen = (itemId: string) => {
    props.navigation.navigate('Hospital', { itemId });
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity onPress={() => navigateToAnotherScreen(item.id)}>
      <View style={styles.item}>
      <Text style={styles.itemText}>{item.text}</Text>
        <View style={styles.itemContent}>
          <View style={styles.itemTextContainer}>
            <Text style= {styles.itemInfoText}>Aquí va información del hospital tipo el nombre, la loc, a cuanta distancia esta de vos etc</Text>
          </View>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const [showModal, setShowModal] = useState(true);

  // Establece la fecha en la que podrás donar (reemplaza con la fecha real)
  const fechaDonacion = new Date('2023-11-10');
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
            <Text style={styles.categoryButtonText}>{category}</Text>
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
    width: 300,
    height: 220,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemTextContainer: {
    marginLeft: 10,
    width: '60%',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
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
    marginRight: 7,
  },
  noticiaSubBText:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A4161A'
  },
  itemInfoText:{
    color: 'white'
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

export default Home;
