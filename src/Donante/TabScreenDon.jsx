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
        <Stack.Screen name='PerfilDonante' options={{ headerShown: false }} {...props}>
          {() => <MyProfile {...props} />}
        </Stack.Screen>
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
        <Stack.Screen name="Hospital" component={HospitalStackNavigation} options={{ headerShown: false }} />
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
            component={HospitalesStackNavigation} 
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
          />

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