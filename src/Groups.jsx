import React from "react"
import { View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { styles } from "./styles"

const API_URL = "http://localhost:3000"

const Groups = (props) => {
    const [groups, setGroups] = React.useState([])

    React.useEffect(() => {
        fetchGroups()
        console.log('fetch')
    }, [])

    const fetchGroups = async () => {
        let groups = await fetch(API_URL + "/groups/")
        groups = await groups.json()
        setGroups(groups)
        console.log(groups)
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 36, textAlign: 'center', color: "black" }}>Grupos</Text>
            </View>
            <View style={styles.midContainer}>
                <FlatList
                    data={groups}
                    containerStyle={styles.flatlistContainer}
                    contentContainerStyle={styles.flatlistContentContainer}
                    ListEmptyComponent={
                        <View>
                            <Text style={{ color: 'black' }}>No hay grupos cargados</Text>
                        </View>
                    }
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={styles.flatlistItemContainer}
                            onPress={() => props.navigation.navigate("Group", { group: item, userId: props.userId })}
                        >
                            <View style={{ flex: 5, alignItems: 'center' }}>
                                <Text style={styles.flatlistItemText}> {item.title} </Text>
                                <Text style={styles.flatlistItemText}> Miembros: {item.members.length} </Text>
                                <Text style={styles.flatlistItemText}> Creado: {item.members.length} </Text>
                            </View>
                        </TouchableOpacity>

                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default Groups