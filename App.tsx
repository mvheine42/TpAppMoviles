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
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import { Provider } from "react-redux";
import store from "./screens/redux/store";
import { connectScreen } from "./screens/redux/helpers";

const LoginScreen = connectScreen(Login);


messaging().getToken().then(t => console.log(t));

requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]).then((statuses) => {
  console.log('Notifs permissions:', statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS])
})

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = (props: any) => {

  return (
    <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!props.loggedInUser ?
      <Stack.Screen name="LoginScreen" component={LoginScreen} /> // Using connected Login component
      :
      <>
      <Stack.Screen name="HomeScreen" component={Home} />
      </>
    }
  </Stack.Navigator>
</NavigationContainer>
    </Provider>
);
};
export default App;