const { Alert } = require('react-native/types');
const {LOG_USER_SUCCESS, LOG_OUT, LOG_USER_FAILURE, LOG_USER_PENDING} = require('../actionTypes/userActionTypes');


async function handleLogin(credentials){
    return async (dispatch) => {
    try{
        const {email, password} = credentials
        const loginCheck = await fetch("http://localhost:3000/users/login?email=" + email + "&password=" + password)
        if (loginCheck.ok) {
            let data = await loginCheck.json()
            dispatch(logUserSuccess(data))
        }
        else {
            dispatch(logUserFailure())
        }
    }
    catch(e){
        dispatch(logUserFailure())
    }}
}


function logUserSuccess(userData){
    return {
        type: LOG_USER_SUCCESS,
        payload: userData
    }
}
function logUserFailure(){
    return {
        type: LOG_USER_FAILURE,
    }
}
function logUserPending(){
    return {
        type: LOG_USER_PENDING,
    }
}
function logOut(){
    return {
        type: LOG_OUT,
    }
}

//disparamos objetos con acciones
