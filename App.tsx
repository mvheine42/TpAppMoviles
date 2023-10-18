// App.tsx

import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {EligeFactorRH, EligeTipoDeSangre, Home, Hospital, Hospitales, Login, MyProfile, Proceso, Requerimientos, 
  VerificacionDeDatos, Turnos, CargarTurnos, TabScreen, TipoDeUsuario, QuieroDonar, SignUpDonante} from './screens';
import { SignUpHospital, HomeHospital, MyProfileHospital, RequestHospital, VerificacionDeDatosHospital, TurnosHospital, CalendarioHospital } from './screens/SignUpHospital/IndexHospital';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false }} />
        <Stack.Screen options={{ headerShown: false }} name='EligeTipoDeSangre' component={EligeTipoDeSangre}/>
        <Stack.Screen options={{ headerShown: false }} name='EligeFactorRH' component={EligeFactorRH}/>
        <Stack.Screen options={{ headerShown: false }} name='VerificacionDeDatos' component={VerificacionDeDatos}/>
        <Stack.Screen options={{ headerShown: false }} name='SignUpDonante' component={SignUpDonante}/>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name='TipoDeUsuario' component={TipoDeUsuario}/>
        <Stack.Screen name="HomeHospital" component={HomeHospital} options={{ headerShown: false }} />
        <Stack.Screen name="MyProfileHospital" component={MyProfileHospital} options={{ headerShown: false }} />
        <Stack.Screen name="RequestHospital" component={RequestHospital} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpHospital" component={SignUpHospital} options={{ headerShown: false }} />
        <Stack.Screen name="VerificacionDeDatosHospital" component={VerificacionDeDatosHospital} options={{ headerShown: false }} />
        <Stack.Screen name="TurnosHospital" component={TurnosHospital} options={{ headerShown: false }} />
        <Stack.Screen name="CalendarioHospital" component={CalendarioHospital} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;