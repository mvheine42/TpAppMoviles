import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {TabScreen} from "./Donante/TabScreen";
import {HomeHospital} from "./Hospital/HomeHospital";
import Login from "./Login";

const Stack = createStackNavigator();

export default function StackNavigator() {
    const [loggedInUser, setLoggedInUser] = React.useState(null);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {loggedInUser ? (
                    loggedInUser.tipoDeUser === 'Hospital' ? (
                        <Stack.Screen name="HomeHospital">
                            {props => <HomeHospital {...props} userId={loggedInUser} />}
                        </Stack.Screen>
                    ) : (   //Si es Donante:
                        <Stack.Screen name="TabScreen">
                            {props => <TabScreen {...props} userId={loggedInUser} />}
                        </Stack.Screen>
                    )
                ) : (
                    <Stack.Screen name="Login">
                        {props => <Login {...props} loginFn={setLoggedInUser} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}