// App.tsx

import React, { useEffect } from "react";
import StackNavigatorScreen from "./src/Navigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { connectScreen } from "./src/redux/helpers";
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";


const obtenerFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log("🔥 Token FCM obtenido:", token);
    
    await AsyncStorage.setItem("fcmToken", token);
    
  } catch (error) {
    console.error("❌ Error al obtener el token FCM:", error);
  }
};

const StackNavigator = connectScreen(StackNavigatorScreen);

const App = () => {
  useEffect(() => {
    // Solicitar permisos de notificaciones
    requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]).then((statuses) => {
      console.log("📢 Estado de permisos:", statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS]);
      if (statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS] !== 'granted') {
        console.error('❌ Permiso de notificaciones no concedido');
      }
    });

    // Obtener el token FCM y guardarlo en AsyncStorage
    obtenerFCMToken();

    // Listener para notificaciones en primer plano
    messaging().onMessage(async remoteMessage => {
      console.log("📩 Notificación en primer plano:", remoteMessage);
      // Aquí podrías mostrar la notificación al usuario usando alguna librería de notificaciones como react-native-notifications
    });

    // Listener para notificaciones en segundo plano
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("📩 Notificación en segundo plano:", remoteMessage);
    });

  }, []);

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
