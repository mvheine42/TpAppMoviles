import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TabScreenDon } from "./Donante/TabScreenDon";
import { TabScreenHosp } from "./Hospital/TabScreenHosp";
import LoginScreen from "./Login";
import { connectScreen } from "./redux/helpers";

const Stack = createStackNavigator();

const HospTab = connectScreen(TabScreenHosp);
const BottTab = connectScreen(TabScreenDon);
const Login = connectScreen(LoginScreen);

export default function StackNavigator(props) {
    //const [loggedInUser, setLoggedInUser] = React.useState(null);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {props.user.isLoggedIn ? (
                    props.user.user.tipoDeUser === 'Hospital' ? (
                        <Stack.Screen name="TabScreenHosp" component={HospTab}>
                        </Stack.Screen>
                    ) : (   //Si es Donante:
                        <Stack.Screen name="TabScreenDon" component={BottTab}>
                        </Stack.Screen>
                    )
                ) : (
                    <Stack.Screen name="Login" component={Login}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}