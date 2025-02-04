import React, { useEffect } from "react";
import StackNavigatorScreen from "./src/Navigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { connectScreen } from "./src/redux/helpers";
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from "react-native-push-notification";

// Crear el canal de notificación
const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: "default-channel-id", // ID del canal
      channelName: "Default Channel",  // Nombre del canal
      channelDescription: "Canal predeterminado para notificaciones", // Descripción
      playSound: true, // Habilitar sonido
      soundName: "default", // Nombre del sonido
      importance: 4, // Alta importancia
      vibrate: true, // Habilitar vibración
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
    // Crear canal de notificación al iniciar la app
    createNotificationChannel();

    requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]).then((statuses) => {
      if (statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS] !== 'granted') {
        console.error('❌ Permiso de notificaciones no concedido');
      }
    });

    obtenerFCMToken();

    messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        const messageBody = remoteMessage.notification.body ?? 'Mensaje no disponible';

        // Aquí ya estás usando el channelId, asegúrate de que esté disponible
        PushNotification.localNotification({
          channelId: "default-channel-id", // Usar el canal creado
          title: remoteMessage.notification.title,
          message: messageBody,
        });
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage.notification) {
        // Manejar notificación en segundo plano
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
