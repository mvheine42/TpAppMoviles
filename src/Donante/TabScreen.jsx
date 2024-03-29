import React from 'react';
import { Image } from 'react-native';
import Home from './HomeDonante';
import MyProfile from './MyProfile';
import Turnos from './Turnos';
import Proceso from './Proceso';
import HistoryDonation from './HistoryDonation';
import Requerimientos from './Requerimientos';
import TiposHospital from './TiposHospital';
import Hospitales from './Hospitales';
import Hospital from './Hospital';
import QuieroDonar from './QuieroDonar';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function StackNavigation(props) {
  console.log(props)
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeDelDonante' options={{ headerShown: false }} {...props}>
        {() => <Home {...props} />}
      </Stack.Screen>
      <Stack.Screen name='Requerimientos' options={{ headerShown: false }} {...props}>
        {() => <Requerimientos {...props} />}
      </Stack.Screen>
      <Stack.Screen name='Proceso' options={{ headerShown: false }} {...props}>
        {() => <Proceso {...props} />}
      </Stack.Screen>
      <Stack.Screen name='HospitalDonante' options={{ headerShown: false }} {...props}>
        {() => <HospitalStackNavigation {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}


function MyProfileStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilDonante" component={MyProfile} options={{ headerShown: false }} />
      <Stack.Screen name='MisTurnos' component={Turnos} options={{ headerShown: false }} />
      <Stack.Screen name='HistoryDonation' component={HistoryDonation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function HospitalesStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TiposHospital" component={TiposHospital} options={{ headerShown: false }} />
      <Stack.Screen name="ListaDeHospitales" component={ListaDeHospitales} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function ListaDeHospitales() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HospitalesDonante" component={Hospitales} options={{ headerShown: false }} />
      <Stack.Screen name="HospitalParaDonar" component={HospitalStackNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function HospitalStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hospital" component={Hospital} options={{ headerShown: false }} />
      <Stack.Screen name="QuieroDonar" component={QuieroDonar} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export const TabScreen = (props) => {

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Tab.Navigator
      shifting={true}
      activeColor="#FFFFFF"
      barStyle={{ backgroundColor: '#A4161A', height: 65 }}
    >
      <Tab.Screen 
        name='Home' 
        options={{
          headerShown: false, 
          tabBarIcon: ({ focused }) => (
            <Image source={require('../../imagenes//icons8-home-48.png')} style={{ width: 30, height: 30, tintColor: focused ? '#A4161A' : 'white' }}/>
          ),
          tabBarOnPress: () => changeTab('HomeDelDonante'),
        }} 
      >
        {() => <StackNavigation {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Turnos" component={Turnos} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('../../imagenes/icons8-calendar-48.png')}
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
            source={require('../../imagenes/icons8-hospital-64.png')}
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
            source={require('../../imagenes/usuario.png')}
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
