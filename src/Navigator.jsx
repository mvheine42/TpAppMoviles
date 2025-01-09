import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TabScreenDon } from "./Donante/TabScreenDon";
import { TabScreenHosp } from "./Hospital/TabScreenHosp";
import LoginScreen from "./Login";
import { connectScreen } from "./redux/helpers";
import { TipoDeUsuario } from "./TipoDeUsuario";
import { SignUpDonante } from "./Donante/SignUp/SignUpDonante";
import SignUpHospital from "./Hospital/SignUp/SignUpHospital";
import { EligeFactorRH } from "./Donante/SignUp/EligeFactorRH";
import { EligeQueDonar } from "./Donante/SignUp/EligeQueDonar";
import EligeTipoDeSangre from "./Donante/SignUp/EligeTipoDeSangre";
import { VerificacionDeDatos } from "./Donante/SignUp/VerificacionDeDatos";
import { VerificacionDeDatosHospital } from "./Hospital/SignUp/VerificacionDeDatosHospital";

const Stack = createStackNavigator();

const HospTab = connectScreen(TabScreenHosp);
const BottTab = connectScreen(TabScreenDon);
const Login = connectScreen(LoginScreen);
const NewUser = connectScreen(TipoDeUsuario);

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
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="TipoDeUsuario" component={NewUser} />
                        <Stack.Screen name="SignUpDonante" component={SignUpDonante} />
                        <Stack.Screen name="EligeQueDonar" component={EligeQueDonar} />
                        <Stack.Screen name="EligeTipoDeSangre" component={EligeTipoDeSangre} />
                        <Stack.Screen name="EligeFactorRH" component={EligeFactorRH} />
                        <Stack.Screen name="VerificacionDeDatos" component={VerificacionDeDatos} />
                        <Stack.Screen name="SignUpHospital" component={SignUpHospital} />
                        <Stack.Screen name="VerificacionDeDatosHospital" component={VerificacionDeDatosHospital} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}