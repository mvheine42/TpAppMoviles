import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigation = useNavigation();

  const handleSendPin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("No se pudo enviar el PIN. Verifica el email.");
      }
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleVerifyPin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/users/verify-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pin }),
      });
      if (!response.ok) {
        throw new Error("PIN incorrecto. Inténtalo de nuevo.");
      }
      setStep(3);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
    }

    setLoading(true);
    setError(""); 
    try {
      const response = await fetch("http://localhost:3000/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pin, newPassword }),
      });
      if (!response.ok) {
        throw new Error("No se pudo restablecer la contraseña.");
      }
      Alert.alert("Éxito", "Contraseña restablecida con éxito");
      setStep(1);
      setEmail("");
      setPin("");
      setNewPassword("");
      setConfirmPassword("");
      navigation.navigate('Login');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const isSendPinDisabled = !email || loading;
  const isVerifyPinDisabled = !pin || loading;
  const isResetPasswordDisabled = !newPassword || loading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DONAVIDA+</Text>
      <Image
        source={require('../imagenes/imagenPrincipal.png')}
        style={styles.image}
      />
      <View style={styles.container}>
        {step === 1 && (
          <View style={styles.card}>
            <Text style={styles.header}>Recuperar Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            <Text style={styles.infoText}>Te enviaremos un PIN a tu email para que puedas verificar tu identidad.</Text>
            <TouchableOpacity
              style={[styles.button, isSendPinDisabled && styles.buttonDisabled]}
              onPress={handleSendPin}
              disabled={isSendPinDisabled}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Enviar PIN</Text>}
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View style={styles.card}>
            <Text style={styles.header}>Verificar PIN</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa el PIN"
              value={pin}
              onChangeText={(text) => setPin(text)}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[styles.button, isVerifyPinDisabled && styles.buttonDisabled]}
              onPress={handleVerifyPin}
              disabled={isVerifyPinDisabled}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Verificar PIN</Text>}
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View style={styles.card}>
            <Text style={styles.header}>Nueva Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Nueva contraseña"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
            <TouchableOpacity
              style={[styles.button, isResetPasswordDisabled && styles.buttonDisabled]}
              onPress={handleResetPassword}
              disabled={isResetPasswordDisabled}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Restablecer Contraseña</Text>}
            </TouchableOpacity>
          </View>
        )}

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#A4161A',
    textAlign: 'center',
    marginTop: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 20,
  },
  card: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    marginBottom: '40%',
  },
  header: {
    color: '#A4161A',
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 8,
    fontSize: 16
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: '#A4161A',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,  
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  infoText: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 15,
  }
});

export default ResetPassword;
