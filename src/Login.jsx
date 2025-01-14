import React from "react"
import { View, Image, Text, TouchableOpacity, ScrollView, Alert, StyleSheet} from "react-native"
import { TextInput } from "react-native-gesture-handler"

const emailImage = require('../imagenes/usuario-2.png');
const cerrarImage = require('../imagenes/candado.png');
const hideImage = require('../imagenes/hide.png');
const viewImage = require('../imagenes/view.png');



const Login = (props) => {
  console.log('PROPS', props.navigation);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
        <ScrollView style={styles.container}>
          <Text style={styles.header}>DONAVIDA+</Text>
          <Image
            source={require('../imagenes/imagenPrincipal.png')} 
            style={styles.image}
          />
          <Text style={styles.welcomeText}>¡BIENVENIDO!</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Image source={emailImage} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholderTextColor="white"
                placeholder="Email"
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputIconContainer}>
              <Image source={cerrarImage} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                secureTextEntry={!showPassword}
                placeholderTextColor="white"
                placeholder="Contraseña"
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                <Image
                  source={showPassword ? viewImage : hideImage}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>


            <TouchableOpacity onPress={() => props.handleLogin({email, password})}
              style={styles.loginButton}>
              <Text style={styles.buttonText}>Iniciar Sesion</Text>
            </TouchableOpacity>
            
            <View style={styles.textContainer}>
              <Text style={styles.forgotPasswordText}>Olvidé mi contraseña</Text>
              <Text style={styles.createAccountText} onPress={() => props.navigation.navigate('TipoDeUsuario')}>Crea tu cuenta</Text>
            </View>
          </View>
        </ScrollView>
      );
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
        fontSize: 46,
        fontWeight: 'bold',
        color: '#A4161A',
        textAlign: 'center',
        marginTop: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 4,
    },
    image: {
        width: 200,
        height: 180,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#A4161A',
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: '#A4161A',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    inputContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    inputIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#BA181B',
        borderRadius: 25,
        padding: 10,
        marginBottom: 10,
        width: 270,
        alignSelf: 'center'
    },
    inputIcon: {
       width: 20,
       height: 20,
       marginRight: 10,
    },
    input: {
        textAlign: 'left',
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    loginButton: {
        backgroundColor: '#660708',
        borderRadius: 25,
        padding: 15,
        marginTop: 5,
        alignItems: 'center',
        width: 270,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    forgotPasswordText: {
        fontSize: 16,
        color: '#660708',
    },
    createAccountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#660708',
        marginTop: 4
    },
    eyeIconContainer: {
      position: "absolute",
      right: 15,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    eyeIcon: {
      width: 20,
      height: 20,
    },
});

export default Login;