import React, { useEffect } from "react";
import StackNavigatorScreen from "./src/Navigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { connectScreen } from "./src/redux/helpers";
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from "react-native-push-notification";

const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: "default-channel-id",
      channelName: "Default Channel",
      channelDescription: "Canal predeterminado para notificaciones",
      playSound: true, 
      soundName: "default",
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`Canal creado: ${created}`)
  );
};

const obtenerFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    await AsyncStorage.setItem("fcmToken", token);
  } catch (error) {
    console.error("❌ Error al obtener el token FCM:", error);
  }
};

const StackNavigator = connectScreen(StackNavigatorScreen);

const App = () => {

  useEffect(() => {
    const solicitarPermisos = async () => {
      try {
        const statuses = await requestMultiple([
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        ]);
  
        if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] !== 'granted' &&
            statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] !== 'granted') {
          console.error('❌ Permiso de ubicación no concedido');
        }
  
        if (statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS] !== 'granted') {
          console.error('❌ Permiso de notificaciones no concedido');
        }

        console.log('Location Permissions: ', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION])
        console.log('Notification Permissions: ', statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS])
      
      } catch (error) {
        console.error('Error al solicitar permisos:', error);
      }
    };
  
    createNotificationChannel();
    solicitarPermisos();
    obtenerFCMToken();
  
    messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        PushNotification.localNotification({
          channelId: "default-channel-id",
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body ?? 'Mensaje no disponible',
        });
        console.log('📩 Notificación en primer plano recibida');
      }
    });
  
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('📩 Notificación en segundo plano recibida');
    });
  
  }, []);

  
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
