// App.tsx

import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {EligeFactorRH, EligeTipoDeSangre, Home, Hospital, Hospitales, Login, MyProfile, Proceso, Requerimientos, SignUp, VerificacionDeDatos, Turnos, CargarTurnos, TabScreen, QuieroDonar} from './screens';

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
        <Stack.Screen options={{ headerShown: false }} name='SignUp' component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;