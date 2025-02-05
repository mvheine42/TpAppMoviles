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
        PushNotification.localNotification({
          channelId: "default-channel-id",
          title: remoteMessage.notification.title,
          message: messageBody,
        });
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage.notification) {
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
