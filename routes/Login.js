import { Text, Button, SafeAreaView, TextInput, StyleSheet } from "react-native"
import { useContext, createContext, useState, useEffect } from "react"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const LoginContext = createContext()

export default function Login({navigation}){

    const [username, setUsername] = useState("test") // for debugging purposes
    const [password, setPassword] = useState("12345678") // for debugging purposes
    const [token, setToken] = useState("")

    const setLogged = useContext(LoginContext)

    const handleButton = (e) => {
        // console.log(123123)
        axios.post("https://tumer.pl/user/login", {
            username,
            password,
            token
        }).then(async response => {
            if(response.status === 200){

                // temp solution
                const setCookieHeader = response.headers["set-cookie"][0]
                // const sessionToken = setCookieHeader.split(";")[0].split("=")[1]
                
                const sessionToken = setCookieHeader

                try {
                    await AsyncStorage.setItem('sessionToken', sessionToken)
                } catch (error) {
                    console.log(error)
                }

                setLogged(true)
            }
        }).catch(err => {
            console.log(err.response.status)
            console.log(err.response.data)
        })
    }

    const handleTest = async e => {
        try {
            const value = await AsyncStorage.getItem("sessionToken")
            if(value !== null){
                console.log(value)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Haste App</Text>
        <Text>Login</Text>
        <TextInput
            style={styles.input}
            autoCapitalize={false}
            onChangeText={setUsername}
            placeholder="Username"
            autoCorrect={false}
            value={username}
        />
        <TextInput
            style={styles.input}
            autoCapitalize={false}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
            autoCorrect={false}
            value={password}
        />
        <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setToken}
            placeholder="Token"
            maxLength={6}
        />
        <Button
            title="Login"
            onPress={() => handleButton()}
        ></Button>

        <Button
            title="Test Storage"
            color="red"
            onPress={() => handleTest()}
        ></Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 5,
        borderRadius: 10, // epic radius
        width: "50%",
        borderWidth: 1,
        padding: 10,
    }
})