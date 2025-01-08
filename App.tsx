// App.tsx

import React from "react";
import StackNavigatorScreen from "./src/Navigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { connectScreen } from "./src/redux/helpers";

import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

messaging().getToken().then(t => console.log("Token:",t));
messaging().setBackgroundMessageHandler( async remoteMessage => {
  console.log("Mensaje en backround:", remoteMessage)
})

requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]).then((statuses) => {
  console.log("Notis perm", statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS])
})

const StackNavigator = connectScreen(StackNavigatorScreen);

const App = () => {
  return(
    <Provider store={store}>
        <StackNavigator/>
    </Provider>
  )
}

export default App