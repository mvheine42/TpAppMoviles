import React from "react"
import { View, Text, TouchableOpacity, Image, Modal, ScrollView, TextInput, SafeAreaView } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { styles } from "./styles"

const API_URL = "http://localhost:3000"

const Group = (props) => {
    const [group, setGroup] = React.useState({ id: 0, members: [], posts: [] })
    const [post, setPost] = React.useState("")
    const [selectedGroup, setSelectedGroup] = React.useState(null)

    React.useEffect(() => {
        fetchGroup(props.route.params.group.id)
    }, [])

    React.useEffect(() => {
        if (selectedGroup) {
            fetchGroup(selectedGroup.idGroup)
        }
    }, [selectedGroup])

    const fetchGroup = async (idGroup) => {
        let group = await fetch(API_URL + "/groups?id=" + idGroup)
        group = await group.json()
        setGroup(group)
        console.log("the group:", group)
    }

    const handleCreatePost = async (userId, groupId) => {
        let pst = await fetch(API_URL + "/posts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: post,
                authorId: userId,
                groupId: groupId
            })
        })
        if (pst.ok) {
            pst = await pst.json()
            console.log("the post:", pst)
            fetchGroup(props.route.params.group.id)
        }
    }
    const handleJoinGroup = async (userId, groupId) => {
        let group = await fetch(API_URL + "/groups/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                groupId: groupId,
                isAdmin: false
            })
        })
        group = await group.json()
        setGroup(group)
        console.log("the group:", group)
        fetchGroup(props.route.params.group.id)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Group</Text>
            </View>
            <Text>Members</Text>
            <View style={{ ...styles.midContainer, flex: 2 }}>
                <FlatList
                    containerStyle={styles.flatlistContainer}
                    contentContainerStyle={styles.flatlistContentContainer}
                    data={group.members}
                    ListEmptyComponent={
                        <View>
                            <Text style={styles.flatlistItemText}>No hay miembros</Text>
                        </View>
                    }
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={styles.flatlistItemContainer}
                        >
                            <View style={{ flex: 5, alignItems: 'center' }}>
                                <Text style={styles.flatlistItemText}> {item.user.name} </Text>
                                <Text style={styles.flatlistItemText}> {item.isAdmin ? "Administrador" : "Usuario"} </Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
            <Text>Posts:</Text>
            <View style={styles.midContainer}>
                {
                    group.members?.find(m => m.userId === props.userId) ?
                        <>
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    containerStyle={styles.flatlistContainer}
                                    contentContainerStyle={styles.flatlistContentContainer}
                                    data={group.posts}
                                    ListEmptyComponent={
                                        <View>
                                            <Text style={styles.flatlistItemText}>No hay posts cargados</Text>
                                        </View>
                                    }
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            style={styles.postItemContainer}
                                        >
                                            <Text style={styles.postItemText}> {item.author.name}: {item.content} </Text>
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={styles.postsInputContainer}>
                                    <TextInput placeholder="Escribí tu post" multiline={true} onChangeText={setPost} />
                                </View>
                            </View>
                        </>
                        :
                        <></>
                }
            </View>
            <View style={styles.bottomContainer}>
                {
                    group.members?.find(m => m.userId === props.userId) ?
                        <TouchableOpacity style={styles.largePurpleButton} onPress={() => handleCreatePost(props.userId, group.id)}>
                            <Text style={styles.largePurpleButtonText}>Crear post</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.largePurpleButton} onPress={() => handleJoinGroup(props.userId, group.id)}>
                            <Text style={styles.largePurpleButtonText}>Unirse al grupo</Text>
                        </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    )
}

export default Group