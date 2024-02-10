export function handleLogin(){
return (dispatch) => {
    let userData = {email: "manu@uca.edu.ar", password: "s3cr370"}
    dispatch(logUserSuccess(userData))}
    }
    function logUserPending(){
        return {
            type: LOG_USER_PENDING
            }
        }
    function logUserSuccess(userData){
        return {
            type: LOG_USER_SUCCESS,
            payload: userData
            }
        }
    function logUserFailure(){
        return {
            type: LOG_USER_FAILURE
        }
    }
    function logOut(){
        return {
            type: LOG_OUT
        }
    }