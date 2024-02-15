import { Alert } from "react-native"

async function handleLogin(email, password) {
    try{
        const loginCheck = await fetch("http://localhost:3000/users/login?email=" + email + "&password=" + password)
        if (loginCheck.ok) {
            let data = await loginCheck.json()
            return data.id
        }
        else {
            Alert.alert("No se encontró el usuario")
            console.log(loginCheck.status)
        }
    }
    catch(e){
        console.log(e.stack)
    }
    finally{
        return
    }
}

export {handleLogin}