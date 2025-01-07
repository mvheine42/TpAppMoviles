import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HistorialTurnosHospital from './HistorialTurnosHospital';
import HomeHospital from './HomeHospital';
import MyProfileHospital from './MyProfileHospital';
import RequestHospital from './RequestHospital';
import PedidosEnCurso from './PedidosEnCurso';
import TurnosHospital from './TurnosHospital';


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function StackNavigation(props) {
  console.log(props)
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeDelHospital' options={{ headerShown: false }} {...props}>
        {() => <HomeHospital {...props} />}
      </Stack.Screen>
      <Stack.Screen name='Turnos' options={{ headerShown: false }} {...props}>
        {() => <TurnosHospitalStackNavigator {...props} />}
      </Stack.Screen>
      <Stack.Screen name='MyProfileHospital' options={{ headerShown: false }} {...props}>
        {() => <MyProfileHospital {...props} />}
      </Stack.Screen>
      <Stack.Screen name='PedidosEnCurso' options={{ headerShown: false }} {...props}>
        {() => <PedidosEnCurso {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}


function MyProfileStackNavigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MyProfileHospital' options={{ headerShown: false }} {...props}>
        {() => <MyProfileHospital {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function TurnosHospitalStackNavigator(props){
    return (
      <Stack.Navigator>
          <Stack.Screen name='TurnosHospital' options={{ headerShown: false }}  {...props}>
              {() => <TurnosHospital {...props} />}
          </Stack.Screen>
          <Stack.Screen name='HistorialTurnosHospital' options={{ headerShown: false }}  {...props}>
              {() => <HistorialTurnosHospital {...props} />}
          </Stack.Screen>
      </Stack.Navigator>
    );
  }

function PedidosHospitalStackNavigator(props){
  return (
    <Stack.Navigator>
        <Stack.Screen name='PedidosEnCurso' options={{ headerShown: false }} {...props}>
            {() => <PedidosEnCurso {...props} />}
        </Stack.Screen>
      <Stack.Screen name='RequestHospital' component={RequestHospital} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}



export const TabScreenHosp = (props) => {
  const [activeTab, setActiveTab] = React.useState(null);

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
      <Tab.Navigator
        shifting={true} activeColor="#A4161A" barStyle={{ backgroundColor: '#FFFFFF' }} >
        <Tab.Screen 
          name="Home" 
          options={{
            headerShown: false, 
            tabBarIcon: ({ focused }) => (
              <Image source={require('../../imagenes/icons8-home-48.png')} style={{ width: 30, height: 30,tintColor: focused ? '#A4161A' : 'gray' }} />
            ),
            tabBarOnPress: () => changeTab('HomeHospital'),
          }}
        >
          {() => <StackNavigation {...props} />}
        </Tab.Screen>

        <Tab.Screen 
          name="Turnos" 
          component={TurnosHospitalStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image source={require('../../imagenes/icons8-calendar-48.png')} style={{ width: 30, height: 30, tintColor: focused ? '#A4161A' : 'gray'  }} />
            ),
            tabBarOnPress: () => changeTab('TurnosHospital'),
          }}
        />

        <Tab.Screen 
          name="Pedidos" 
          component={PedidosHospitalStackNavigator} 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image source={require('../../imagenes/icons8-order-64.png')}  style={{ width: 33, height: 33, tintColor: focused ? '#A4161A' : 'gray' }} />
            ),
            tabBarOnPress: () => changeTab('PedidosEnCurso'),
          }}
        />

        <Tab.Screen 
          name="Perfil" 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image source={require('../../imagenes/usuario.png')} style={{ width: 25, height: 25, tintColor: focused ? '#A4161A' : 'gray' }} />
            ),
            tabBarOnPress: () => changeTab('Perfil'),
          }}
          >
            {() => <MyProfileStackNavigation {...props} />}
          </Tab.Screen>
      </Tab.Navigator>
  );
};