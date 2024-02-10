// App.tsx

import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {EligeFactorRH, EligeTipoDeSangre, Home, Login,
  VerificacionDeDatos, TabScreen, TipoDeUsuario, SignUpDonante, GraciasScreen, TiposHospital, HistoryDonation} from './screens';
import { SignUpHospital, VerificacionDeDatosHospital } from './screens/SignUpHospital/IndexHospital';
import { TabScreenHospital } from './screens/SignUpHospital/TabScreenHospital';
import { HospitalProvider } from './screens/HospitalContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  const [loggedInUser, setLoggedInUser] = React.useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!loggedInUser ? (
          <Stack.Screen name="Login">
            {(props: any) => <Login {...props} loginFn={setLoggedInUser} />}
          </Stack.Screen>
        ) : (
             <>
            <Stack.Screen name="TabScreen">
              {(props: any) => (
                <HospitalProvider {...props} user={loggedInUser}>
                  <TabScreen {...props} user={loggedInUser} />
                </HospitalProvider>
              )}
            </Stack.Screen>
  
            <Stack.Screen name="EligeTipoDeSangre">
              {(props: any) => <EligeTipoDeSangre {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="EligeFactorRH">
              {(props: any) => <EligeFactorRH {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="VerificacionDeDatos">
              {(props: any) => <VerificacionDeDatos {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="SignUpDonante">
              {(props: any) => <SignUpDonante {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="Home">
              {(props: any) => <Home {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="TipoDeUsuario">
              {(props: any) => <TipoDeUsuario {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="SignUpHospital">
              {(props: any) => <SignUpHospital {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="VerificacionDeDatosHospital">
              {(props: any) => (
                <VerificacionDeDatosHospital {...props} user={loggedInUser} />
              )}
            </Stack.Screen>
  
            <Stack.Screen name="GraciasScreen">
              {(props: any) => <GraciasScreen {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="TiposHospital">
              {(props: any) => <TiposHospital {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="TabScreenHospital">
              {(props: any) => <TabScreenHospital {...props} user={loggedInUser} />}
            </Stack.Screen>
  
            <Stack.Screen name="HistoryDonation">
              {(props: any) => <HistoryDonation {...props} user={loggedInUser} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;