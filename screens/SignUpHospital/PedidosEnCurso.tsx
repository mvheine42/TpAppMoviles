import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const PedidosEnCurso = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>Pedidos en Curso</Text>
      {/* Aquí mostrarás la información de los pedidos en curso */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});