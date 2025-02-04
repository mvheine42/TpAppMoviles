import AsyncStorage from "@react-native-async-storage/async-storage";
const {LOG_USER_SUCCESS, LOG_OUT, LOG_USER_FAILURE, LOG_USER_PENDING} = require('../actionTypes/userActionTypes');

export function handleLogin(credentials) {
    return async (dispatch) => {
        dispatch(logUserPending());

        try {
            const { email, password } = credentials;
            const response = await fetch(`http://localhost:3000/users/login?email=${email}&password=${password}`);
            const data = await response.json();

            if (response.ok) {
                const fcmToken = await AsyncStorage.getItem("fcmToken");

                if (fcmToken) {
                    const saveTokenResponse = await fetch("http://localhost:3000/users/save-token", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            fcmToken,
                            userId: data.id,
                            userType: data.tipoDeUser,
                        }),
                    });

                    const saveTokenData = await saveTokenResponse.json();

                    if (saveTokenResponse.ok) {
                        console.log("✅ Token FCM guardado exitosamente");
                    } else {
                        console.log("⚠ Error al guardar el token FCM:", saveTokenData.message);
                    }

                } else {
                    console.log("⚠ No hay token FCM guardado");
                }

                dispatch(logUserSuccess(data));

            } else {
                console.log("message: ", data.message);
                const errorMessage = data.message || 'Usuario o contraseña incorrectos';
                dispatch(logUserFailure(errorMessage));
                throw new Error(errorMessage);
            }
        } catch (error) {
            dispatch(logUserFailure("Error de conexión con el servidor"));
            throw new Error(error);
        }
    };
}


function logUserSuccess(userData) {
    return { type: LOG_USER_SUCCESS, payload: userData };
}

function logUserFailure(errorMessage) {
    return { type: LOG_USER_FAILURE, payload: errorMessage };
}

function logUserPending() {
    return { type: LOG_USER_PENDING };
}

export function logOut(){
    return {
        type: LOG_OUT,
    }
}


//disparamos objetos con acciones
