import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {TabScreen} from "./Donante/TabScreen";
import {HomeHospital} from "./Hospital/TabScreen/HomeHospital";
import MyProfileHospital from "./Hospital/TabScreen/MyProfileHospital";
import PedidosEnCurso from "./Hospital/TabScreen/PedidosEnCurso";
import RequestHospital from "./Hospital/TabScreen/RequestHospital";
import TurnosHospital from "./Hospital/TabScreen/TurnosHospital";
import Login from "./Login";

const Stack = createStackNavigator();

export default function StackNavigator() {
    const [loggedInUser, setLoggedInUser] = React.useState(null);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {loggedInUser ? (
                    loggedInUser.tipoDeUser === 'Hospital' ? (
                        <>
                            <Stack.Screen name="HomeHospital">
                                {props => <HomeHospital {...props} userId={loggedInUser} />}
                            </Stack.Screen>
                            <Stack.Screen name="MyProfileHospital">
                                {props => <MyProfileHospital {...props} userId={loggedInUser} />}
                            </Stack.Screen>
                            <Stack.Screen name="PedidosEnCurso">
                                {props => <PedidosEnCurso {...props} userId={loggedInUser} />}
                            </Stack.Screen>
                            <Stack.Screen name="RequestHospital">
                                {props => <RequestHospital {...props} userId={loggedInUser} />}
                            </Stack.Screen>
                            <Stack.Screen name="TurnosHospital">
                                {props => <TurnosHospital {...props} userId={loggedInUser} />}
                            </Stack.Screen>
                        </>
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