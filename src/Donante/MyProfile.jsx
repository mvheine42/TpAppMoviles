import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
const profileImage = require('../../imagenes/icons8-circled-user-female-skin-type-4-100.png');
const logOutImage = require('../../imagenes/icons8-logout-100-2.png');

const API_URL = "http://localhost:3000"


export const MyProfile = (props) => {

  const [editing, setEditing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [post, setPost] = React.useState("");

  const handleUpdatePost = async () => {
    try {
        const response = await fetch(API_URL + "/donantes/" + postId, { // Especifica el ID del post que deseas actualizar
            method: "PUT", // Utiliza el método PUT para actualizar el post existente
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: newPostContent, // Nuevo contenido del post
                authorId: userId,
                groupId: groupId
            })
        });

        if (response.ok) {
            const updatedPost = await response.json();
            console.log("Post actualizado:", updatedPost);
            // Aquí puedes realizar cualquier acción adicional después de la actualización exitosa
        } else {
            console.error("Error al actualizar el post:", response.status);
        }
    } catch (error) {
        console.error("Error en la solicitud de actualización:", error);
    }
};


  const fieldsToShow = ['nombre', 'apellido', 'email', 'edad', 'peso', 'medicaciones', 'embarazo'];


  const handleEdit = () => {
    setEditing(true);
  };

  console.log(props.user.user);
  const userFields = props.user.user ? Object.keys(props.user.user) : [];
  console.log(userFields);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.header}>
      <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => props.logOut()} // Trigger the logout function
          disabled={loggingOut}>
          <Image source={logOutImage} style={styles.logOutImage} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <View style={styles.imageWrapper}>
            <Image source={profileImage} style={styles.perfilImage} />
          </View>
        </View>
        <Text style={styles.perfilName}>{props.user.user.nombre} {props.user.user.apellido}</Text>
      </View>
      <ScrollView style={styles.content}>
        {fieldsToShow.map(field => (
          props.user.user[field] !== undefined && props.user.user[field]  !== null && (
            <View key={field} style={styles.fieldContainer}>
              <Text style={styles.label}>
                {field === 'nombre' ? 'Nombre' :
                 field === 'apellido' ? 'Apellido' :
                 field === 'email' ? 'Correo' :
                 field === 'edad' ? 'Edad' :
                 field === 'peso' ? 'Peso' :
                 field === 'medicaciones' ? 'Medicación' :
                 field === 'embarazo' ? 'Probabilidad de embarazo' : ''}:
              </Text>
              <Text>{props.user.user[field]}</Text>
            </View>)))}
            </ScrollView>
      <View style={styles.timeSinceDonation}>
        <Text style={styles.label}>Tiempo desde la última donación: 6 meses y 6 días</Text>
      </View>
      <TouchableOpacity
  onPress={() => props.navigation.navigate('HistoryDonation')}>
  <View style={styles.historyBenefits}>
    <Text style={styles.historyBenefitsText}>Historial y Beneficios</Text>
  </View>
</TouchableOpacity>
  </ScrollView>

)};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    height: '100%',
    backgroundColor: '#A4161A',
    position: 'relative', // Agrega esto para que el position: 'absolute' de logoutButton funcione correctamente
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A4161A',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 15,
    position: 'relative', // Ajusta para que el position: 'absolute' de logoutButton funcione correctamente
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 100,
    height: 100,
    backgroundColor: '#D3D3D3',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 40,
  },
  perfilImage: {
    width: 100,
    height: 100,
  },
  perfilName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#660708',
    marginTop: 50, // Reduce the margin here
    backgroundColor: '#F5F3F4',
    borderRadius: 10,
    padding: 5,
    textAlign: 'center',
    width: '100%',
  },
  content: {
    backgroundColor: '#F5F3F4',
    borderRadius: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A4161A',
  },
  info: {
    fontSize: 16,
    color: 'black',
  },
  infoEdit: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    color: 'black',
  },
  editButton: {
    backgroundColor: '#A4161A',
    borderRadius: 15,
    padding: 15,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#B1A7A6',
    borderRadius: 20,
    padding: 15,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#A4161A',
    borderRadius: 20,
    padding: 15,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  timeSinceDonation: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#F5F3F4', // Color de fondo
    padding: 10, // Espaciado interior
    borderRadius: 10, // Bordes redondeados
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  historyBenefits: {
    backgroundColor: '#F5F3F4', // Color de fondo del contenedor
    borderRadius: 10, // Bordes redondeados
    padding: 15, // Espaciado interior
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  historyBenefitsText: {
    color: 'black', // Color del texto
    fontWeight: 'bold', // Estilo de texto en negrita
    fontSize: 20, // Tamaño de fuente
  },   
  logoutButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
  logOutImage: {
    width: 30, // Ajusta según tus preferencias
    height: 30, // Ajusta según tus preferencias
  },
});

export default MyProfile;


//const handleCancel = () => {
    //setEditing(false);
    //setEditedPerfil({ ...perfil });
  //};

  //const handleSave = () => {
    //setEditing(false);
    //setPerfil({ ...editedPerfil });
  //};

  //const handleLogout = () => {
    // Lógica de logout aquí
    //setLoggingOut(true); // Puedes mostrar un indicador de carga si es necesario
    // Ejemplo: Redirigir al inicio de sesión o realizar otras acciones de logout

    //setLoggingOut(false);
  //};