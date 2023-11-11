import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home';
import { MyProfile } from './MyProfile';
import Turnos from './Turnos';
import Requerimientos from './Requerimientos';
import Proceso from './Proceso';
import Hospitales from './Hospitales';
import Hospital from './Hospital';
import QuieroDonar from './QuieroDonar';
import TiposHospital from './TiposHospital';
import HistoryDonation from './HistoryDonation';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function StackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='HomeDonante' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='Requerimientos' component={Requerimientos} options={{ headerShown: false }}/>
        <Stack.Screen name='Proceso' component={Proceso} options={{ headerShown: false }}/>
        <Stack.Screen name='Hospital' component={HospitalStackNavigation} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function MyProfileStackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="PerfilDonante" component={MyProfile} options={{ headerShown: false }}/>
      <Stack.Screen name='MisTurnos' component={Turnos} options={{ headerShown: false }}/>
      <Stack.Screen name='HistoryDonation' component={HistoryDonation} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function HospitalesStackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="TiposHospital" component={TiposHospital} options={{ headerShown: false }}/>
      <Stack.Screen name="Hospitales" component={ListaDeHospitales} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function ListaDeHospitales(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="HospitalesDonante" component={Hospitales} options={{ headerShown: false }}/>
      <Stack.Screen name="Hospital" component={HospitalStackNavigation} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function HospitalStackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Hospital" component={Hospital} options={{ headerShown: false }}/>
      <Stack.Screen name="QuieroDonar" component={QuieroDonar} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export const TabScreen = (props:any) => {
  const [activeTab, setActiveTab] = useState('HomeDonante');

  const changeTab = (tabName: any) => {
    setActiveTab(tabName);
  };
  return (
    <Tab.Navigator
      shifting={true}
      activeColor="#FFFFFF" // Color rojo para pestañas activas
      barStyle={{ backgroundColor: '#A4161A', height: 65}} // Establecer el fondo blanco
    >
 <Tab.Screen name='HomeDonante' component={StackNavigation} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./imagenes/icons8-home-48.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? '#A4161A' : 'white', // Cambiar el color del icono según la pestaña activa
            }}
          />
        ),
        tabBarOnPress: () => changeTab('HomeDonante'),
      }} />
      <Tab.Screen name="TurnosDonante" component={Turnos} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./imagenes/icons8-calendar-48.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? '#A4161A' : 'white', // Cambiar el color del icono según la pestaña activa
            }}
          />
        ),
        tabBarOnPress: () => changeTab('TurnosDonante'),
      }} />
      <Tab.Screen name="HospitalesDonante" component={HospitalesStackNavigation} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./imagenes/icons8-hospital-64.png')}
            style={{
              width: 33,
              height: 33,
              tintColor: focused ? '#A4161A' : 'white', // Cambiar el color del icono según la pestaña activa
            }}
          />
        ),
        tabBarOnPress: () => changeTab('HospitalesDonante'),
      }} />
      <Tab.Screen name="PerfilDonante" component={MyProfileStackNavigation} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./imagenes/usuario.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? '#A4161A' : 'white', // Cambiar el color del icono según la pestaña activa
            }}
          />
        ),
        tabBarOnPress: () => changeTab('PerfilDonante'),
      }} />
    </Tab.Navigator>
  );
}
