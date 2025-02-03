import React from "react"
import { View, Image, Text, TouchableOpacity, ScrollView, Alert, StyleSheet} from "react-native"
import { TextInput } from "react-native-gesture-handler"

const emailImage = require('../imagenes/usuario-2.png');
const cerrarImage = require('../imagenes/candado.png');
const hideImage = require('../imagenes/hide.png');
const viewImage = require('../imagenes/view.png');

const ErrorPopup = ({ message, onClose }) => {
  return (
    <View style={styles.errorPopup}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const Login = (props) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState(""); 

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleLoginPress = async () => {
      try {
          await props.handleLogin({ email, password });
      } catch (error) {
          setError(error.message || "Error desconocido");
      }
   };

   const handleCloseErrorPopup = () => {
    setError("");
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


            <TouchableOpacity onPress={handleLoginPress}
              style={styles.loginButton}>
              <Text style={styles.buttonText}>Iniciar Sesion</Text>
            </TouchableOpacity>
            
            <View style={styles.textContainer}>
              <Text style={styles.forgotPasswordText}onPress={() => props.navigation.navigate('ResetPassword')}>Olvidé mi contraseña</Text>
              <Text style={styles.createAccountText} onPress={() => props.navigation.navigate('TipoDeUsuario')}>Crea tu cuenta</Text>
            </View>
          </View>

          {error ? <ErrorPopup message={error} onClose={handleCloseErrorPopup} /> : null}

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
        fontSize: 17.5,
        color: '#660708',
        marginTop: 5
    },
    createAccountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#660708',
        marginTop: 10
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
    errorPopup: {
    position: "absolute",
    top: "50%",
    left: "10%",
    right: "10%",
    padding: 30,
    backgroundColor: "rgba(63, 0, 0, 0.89)",
    borderRadius: 8,
    alignItems: "center",
    zIndex: 1,
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 30,
    textAlign: "left",
  },
  closeButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#333",
    fontSize: 16,
  },
});

export default Login;