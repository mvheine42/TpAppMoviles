// App.tsx

import React from "react";
import StackNavigatorScreen from "./src/Navigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { connectScreen } from "./src/redux/helpers";

const StackNavigator = connectScreen(StackNavigatorScreen);

const App = () => {
  return(
    <Provider store={store}>
        <StackNavigator/>
    </Provider>
  )
}

export default App