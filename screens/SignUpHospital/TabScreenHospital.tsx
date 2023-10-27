import React, { useState } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HistorialTurnosHospital, HomeHospital, MyProfileHospital, RequestHospital, PedidosEnCurso, VerificacionDeDatosHospital, TurnosHospital } from './IndexHospital';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeHospitalStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeHospital' component={HomeHospital} options={{ headerShown: false }} />
      <Stack.Screen name='TurnosHospital' component={TurnosHospital} options={{ headerShown: false }} />
      <Stack.Screen name='RequestHospital' component={RequestHospital} options={{ headerShown: false }} />
      <Stack.Screen name='MyProfileHospital' component={MyProfileHospital} options={{ headerShown: false }} />
      <Stack.Screen name='PedidosEnCurso' component={PedidosEnCurso} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MyProfileHospitalStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfileHospital" component={MyProfileHospital} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function TurnosHospitalStackNavigator(){
  return (
    <Stack.Navigator>
      <Stack.Screen name='TurnosHospital' component={TurnosHospital} options={{ headerShown: false }} />
      <Stack.Screen name='HistorialTurnosHospital' component={HistorialTurnosHospital} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export const TabScreenHospital = (props: any) => {
  const [activeTab, setActiveTab] = useState('Home');

  const changeTab = (tabName: any) => {
    setActiveTab(tabName);
  };

  return (
    <Tab.Navigator
      shifting={true}
      activeColor="#A4161A" // Color rojo para pestañas activas
      barStyle={{ backgroundColor: '#FFFFFF' }} // Establecer el fondo blanco
    >
      <Tab.Screen name='Home' component={HomeHospitalStackNavigation} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('../imagenes/icons8-home-48.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? '#A4161A' : 'gray', // Cambiar el color del icono según la pestaña activa
            }}
          />
        ),
        tabBarOnPress: () => changeTab('Home'),
      }} />
      <Tab.Screen name='Turnos' component={TurnosHospitalStackNavigator} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('../imagenes/icons8-calendar-48.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? '#A4161A' : 'gray', // Cambiar el color del icono según la pestaña activa
            }}
          />
        ),
        tabBarOnPress: () => changeTab('Turnos'),
      }} />
      <Tab.Screen name='Pedidos' component={PedidosEnCurso} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('../imagenes/icons8-order-64.png')}
            style={{
              width: 33,
              height: 33,
              tintColor: focused ? '#A4161A' : 'gray', // Cambiar el color del icono según la pestaña activa
            }}
          />
        ),
        tabBarOnPress: () => changeTab('Pedidos'),
      }} />
      <Tab.Screen name='Perfil' component={MyProfileHospitalStackNavigation} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('../imagenes/usuario.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? '#A4161A' : 'gray', // Cambiar el color del icono según la pestaña activa
            }}
          />
        ),
        tabBarOnPress: () => changeTab('Perfil'),
      }} />
    </Tab.Navigator>
  );
}