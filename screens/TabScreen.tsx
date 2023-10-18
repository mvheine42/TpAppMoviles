import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home';
import { MyProfile } from './MyProfile';
import Turnos from './Turnos';
import Requerimientos from './Requerimientos';
import Proceso from './Proceso';
import Hospitales from './Hospitales';
import Hospital from './Hospital';
import QuieroDonar from './QuieroDonar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function StackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='Requerimientos' component={Requerimientos} options={{ headerShown: false }}/>
        <Stack.Screen name='Proceso' component={Proceso} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function MyProfileStackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={MyProfile} options={{ headerShown: false }}/>
      <Stack.Screen name='MisTurnos' component={Turnos} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function HospitalesStackNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Hospitales" component={Hospitales} options={{ headerShown: false }}/>
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
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={StackNavigation} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/home-page.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),}}/>
      <Tab.Screen name="Perfil" component={MyProfileStackNavigation} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/gender-neutral-user--v1.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ), }}/>
      <Tab.Screen name="Turnos" component={Turnos} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/calendar--v1.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),}}/>
      <Tab.Screen name="Hospitales" component={HospitalesStackNavigation} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/emoji/48/hospital-emoji.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ), }}/>
    </Tab.Navigator>
  );
}
