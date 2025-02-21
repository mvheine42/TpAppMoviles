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
  import { HospitalProvider } from './HospitalContext';
  import { createStackNavigator } from '@react-navigation/stack';
  import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
  import GraciasScreen from './GraciasScreen';

  const Stack = createStackNavigator();
  const Tab = createMaterialBottomTabNavigator();


  function StackNavigation(props) {
    return (
      <Stack.Navigator>
        <Stack.Screen name='HomeDelDonante' options={{ headerShown: false }}>
          {(screenProps) => <Home {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name='Requerimientos' options={{ headerShown: false }}>
          {(screenProps) => <Requerimientos {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name='Proceso' options={{ headerShown: false }}>
          {(screenProps) => <Proceso {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name='HospitalDonante' options={{ headerShown: false }}>
          {(screenProps) => <HospitalStackNavigation {...props} {...screenProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function HospitalStackNavigation({ route, navigation, ...props }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Hospital' options={{ headerShown: false }}>
          {(screenProps) => (
            <Hospital 
              {...props} 
              {...screenProps} 
              route={route}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name='QuieroDonar' options={{ headerShown: false }}>
          {(screenProps) => <QuieroDonar {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="GraciasScreen" component={GraciasScreen} 
          options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  
  function MyProfileStackNavigation(props) {
    return (
      <Stack.Navigator>
      <Stack.Screen name='PerfilDonante' options={{ headerShown: false }}>
        {(screenProps) => <MyProfile {...props} {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name='MisTurnos' options={{ headerShown: false }}>
        {(screenProps) => <Turnos {...props} {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name='HistoryDonation' options={{ headerShown: false }}>
        {(screenProps) => <HistoryDonation {...props} {...screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

  function HospitalesStackNavigation(props) {
    return (
      <Stack.Navigator>
        <Stack.Screen name='TiposHospital' options={{ headerShown: false }}>
          {(screenProps) => <TiposHospital {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name='HospitalesDonante' options={{ headerShown: false }}>
          {(screenProps) => <Hospitales {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name='Hospital' options={{ headerShown: false }}>
          {(screenProps) => <Hospital {...props} {...screenProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function ListaDeHospitales(props) {
    return (
      <Stack.Navigator>
        <Stack.Screen name='HospitalesDonante' options={{ headerShown: false }}>
          {(screenProps) => <Hospitales {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name='Hospital' options={{ headerShown: false }}>
          {(screenProps) => <Hospital {...props} {...screenProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }


  export const TabScreenDon = (props) => {
    const [activeTab, setActiveTab] = React.useState(null);

    const changeTab = (tabName) => {
      setActiveTab(tabName);
    };

    return (
      <HospitalProvider>
        <Tab.Navigator
          shifting={true}
          activeColor="#FFFFFF"
          barStyle={{ backgroundColor: '#A4161A', height: 65 }}
        >
          <Tab.Screen 
            name="Home" 
            options={{
              headerShown: false, 
              tabBarIcon: ({ focused }) => (
                <Image source={require('../../imagenes/icons8-home-48.png')} style={{ width: 30, height: 30, tintColor: focused ? '#A4161A' : 'white' }}/>
              ),
              tabBarOnPress: () => changeTab('HomeDelDonante'),
            }}
          >
            {() => <StackNavigation {...props} />}
          </Tab.Screen>

          <Tab.Screen 
            name="Turnos" 
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../../imagenes/icons8-calendar-48.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#A4161A' : 'white',
                  }}
                />
              ),
              tabBarOnPress: () => changeTab('Turnos'),
            }}
          >
            {() => <Turnos {...props} />}
          </Tab.Screen>

          <Tab.Screen 
            name="Hospitales"  
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../../imagenes/icons8-hospital-64.png')}
                  style={{
                    width: 33,
                    height: 33,
                    tintColor: focused ? '#A4161A' : 'white',
                  }}
                />
              ),
              tabBarOnPress: () => changeTab('Hospitales'),
            }}
            >
            {() => <HospitalesStackNavigation {...props} />}
          </Tab.Screen>

          <Tab.Screen 
            name="Perfil" 
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../../imagenes/usuario.png')}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#A4161A' : 'white',
                  }}
                />
              ),
              tabBarOnPress: () => changeTab('Perfil'), 
            }}
          >
            {() => <MyProfileStackNavigation {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </HospitalProvider>
    );
  };