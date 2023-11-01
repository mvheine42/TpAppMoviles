import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const Proceso = (props: any) => {

    const [activeButton, setActiveButton] = useState(0);

    const buttons = [
        { title: 'Para donar sangre', content: ' Deberás sentarte en una posición cómoda mientras te limpian y esterilizan tu brazo. Te mantendrás sentado mientras se extrae la sangre de tu brazo. Una vez que se termina la donación, colocarán una venda en tu brazo. Una donación completa de sangre es de hasta 500 mililitros o, aproximadamente, 17 onzas.' },
        { title: 'Para donar médula', content: 'La donacion de medula ósea se realiza extrayendo, con una jeringuilla, una pequeña cantidad de sangre medular de la parte posterior del hueso de la cadera. Asta extracción se realiza bajo anestesia general o epidural, en el hospital especializado más cercano al domicilio del donante. La obtención de células madre de sangre periférica requiere administrar 4 ó 5 inyecciones subcutáneas de unas sustancias denominadas factores de crecimiento hematopoyetico, que hacen que las células madre de la médula ósea pasen a la sangre. Esta donación no requiere anestesia y se realiza en el hospital especializado más cercano al domicilio del donante' },
        { title: 'Para donar plaquetas', content: 'Por medio del separador celular con una ó dos punciones de vena según las características del equipo empleado, se recogen solamente las plaquetas y se restituye al donante el resto de los componentes de su sangre. El procedimiento demora aproximadamente una hora y se realiza en las mejores condiciones de confort' },
    ];

    const toggleButton = (index) => {
        if (activeButton === index) {
            setActiveButton(null); // Cierra el botón si ya está abierto
        } else {
            setActiveButton(index); // Abre el botón seleccionado
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>DonaVida+</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.tituloRequerimientos}>
                    <Text style={styles.RequerimientosText}>¿Cómo es el proceso?</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {buttons.map((button, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.button, activeButton === index && styles.activeButton]}
                            onPress={() => toggleButton(index)}
                        >
                            <Text style={[styles.buttonText, activeButton === index && styles.activeButtonText]}>
                                {button.title}
                            </Text>
                            {activeButton === index && (
                                <Text style={[styles.buttonContent, activeButton === index && styles.activeButtonContent]}>
                                    {button.content}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '14%',
        backgroundColor: 'rgb(245, 243, 244)',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        position: 'relative',
      },
      title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#A4161A',
        textAlign: 'center',
        textShadowColor: '#A4161A',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
      },
    scrollView: {
        flex: 1,
    },
    tituloRequerimientos: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingBottom: 10,
    },
    RequerimientosText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#A4161A',
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#A4161A',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
    },
    activeButton: {
        backgroundColor: 'rgb(229, 56, 59)',
    },
    buttonText: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: 'white',
    },
    activeButtonText: {
        color: 'white', 
    },
    buttonContent: {
        marginTop: 10,
        fontSize: 18, 
        color: 'black', 
    },
    activeButtonContent: {
        color: 'white', 
    },
});

export default Proceso;
