// App.tsx

import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {EligeFactorRH, EligeTipoDeSangre, Home, Login,
  VerificacionDeDatos, TabScreen, TipoDeUsuario, SignUpDonante, GraciasScreen, TiposHospital} from './screens';
import { SignUpHospital, VerificacionDeDatosHospital } from './screens/SignUpHospital/IndexHospital';
import { TabScreenHospital } from './screens/SignUpHospital/TabScreenHospital';

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
        <Stack.Screen name="SignUpHospital" component={SignUpHospital} options={{ headerShown: false }} />
        <Stack.Screen name="VerificacionDeDatosHospital" component={VerificacionDeDatosHospital} options={{ headerShown: false }} />
        <Stack.Screen name="GraciasScreen" component={GraciasScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TiposHospital" component={TiposHospital} options={{ headerShown: false }} />
        <Stack.Screen name="TabScreenHospital" component={TabScreenHospital} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;