import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const data = [
  { id: '1', text: 'Sangre', category: 'Sangre' },
  { id: '2', text: 'Plaquetas', category: 'Plaquetas' },
  { id: '3', text: 'Medula', category: 'Médula' },
  { id: '4', text: 'Sangre', category: 'Sangre' },
  { id: '5', text: 'Plaquetas', category: 'Plaquetas' },
  { id: '6', text: 'Medula', category: 'Médula' },
  { id: '7', text: 'Sangre', category: 'Sangre' },
  { id: '8', text: 'Plaquetas', category: 'Plaquetas' },
  { id: '9', text: 'Medula', category: 'Médula' },
  { id: '10', text: 'Sangre', category: 'Sangre' },
  { id: '11', text: 'Plaquetas', category: 'Plaquetas' },
  { id: '12', text: 'Medula', category: 'Médula' },
];

const categories = Array.from(new Set(data.map((item) => item.category)));



interface Item {
  id: string;
  text: string;
  category: string;
}

const renderItem = ({ item }: { item: Item }) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{item.text}</Text>
  </View>
);

export const Home = (props: any) => {
  const [selectedCategories, setSelectedCategories] = useState(['Sangre']); // Inicialmente muestra la categoría 'Sangre'

  // Función para cambiar las categorías seleccionadas
  const toggleCategory = (category: string) => {
    // Si la categoría ya está seleccionada, la eliminamos; de lo contrario, la agregamos.
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  // Filtra los elementos basados en las categorías seleccionadas
  const filteredData = data.filter((item) =>
    selectedCategories.includes(item.category)
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DonaVida+</Text>
      </View>
      <View style={styles.tituloNoticias}>
        <Text style={styles.noticiasText}>DONACIONES</Text>
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
  tituloNoticias: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  noticiasText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'rgb(229, 56, 59)',
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  categoryButton: {
    backgroundColor: 'rgb(229, 56, 59)',
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
    color: 'rgb(229, 56, 59)',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    width: 200,
    height: 220,
    backgroundColor: 'rgb(229, 56, 59)',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'darkred',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  flatlistContent: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: 'rgb(229, 56, 59)',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'darkred',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
