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
import { Login } from './Login';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();



function StackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='HomeDelDonante' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='Requerimientos' component={Requerimientos} options={{ headerShown: false }}/>
        <Stack.Screen name='Proceso' component={Proceso} options={{ headerShown: false }}/>
        <Stack.Screen name='HospitalDonante' component={HospitalStackNavigation} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function MyProfileStackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="PerfilDonante" component={MyProfile} options={{ headerShown: false }}/>
      <Stack.Screen name='MisTurnos' component={Turnos} options={{ headerShown: false }}/>
      <Stack.Screen name='HistoryDonation' component={HistoryDonation} options={{ headerShown: false }}/>
      <Stack.Screen name='Home' component={Login} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

function HospitalesStackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="TiposHospital" component={TiposHospital} options={{ headerShown: false }}/>
      <Stack.Screen name="ListaDeHospitales" component={ListaDeHospitales} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function ListaDeHospitales(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="HospitalesDonante" component={Hospitales} options={{ headerShown: false }}/>
      <Stack.Screen name="HospitalParaDonar" component={HospitalStackNavigation} options={{ headerShown: false }}/>
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
  const [activeTab, setActiveTab] = useState('Home');

  const changeTab = (tabName: any) => {
    setActiveTab(tabName);
  };
  return (
    <Tab.Navigator
      shifting={true}
      activeColor="#FFFFFF" // Color rojo para pestañas activas
      barStyle={{ backgroundColor: '#A4161A', height: 65}} // Establecer el fondo blanco
    >
 <Tab.Screen name='Home' component={StackNavigation} options={{
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
        tabBarOnPress: () => changeTab('Home'),
      }} />
      <Tab.Screen name="Turnos" component={Turnos} options={{
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
        tabBarOnPress: () => changeTab('Turnos'),
      }} />
      <Tab.Screen name="Hospitales" component={HospitalesStackNavigation} options={{
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
        tabBarOnPress: () => changeTab('Hospitales'),
      }} />
      <Tab.Screen name="Perfil" component={MyProfileStackNavigation} options={{
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
        tabBarOnPress: () => changeTab('Perfil'),
      }} />
    </Tab.Navigator>
  );
}
