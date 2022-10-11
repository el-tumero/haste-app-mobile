import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const LoginContext = createContext();

export default function Login() {
  const [username, setUsername] = useState("teaver00"); // for debugging purposes
  const [password, setPassword] = useState("12345678"); // for debugging purposes
  const [token, setToken] = useState("");
  const setLogged = useContext(LoginContext);

  async function generateUUID() {
    const key = "DEVICE_ID";
    const value = uuidv4();
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("UUID: " + result);
    } else {
      alert("Can't read value");
    }
  }

  const handleLogin = async (e) => {
    console.log("getting UUID");
    await generateUUID();
    const uid = await SecureStore.getItemAsync("DEVICE_ID");
    console.log("got UUID: " + uid);
    console.log(username, password, token, uid);

    axios
      .post("https://tumer.pl/user/login", {
        username,
        password,
        token,
        uid,
      })
      .then(async (response) => {
        console.log(response.data);
        if (response.status === 200) {
          console.log("successfully logged");
          const setCookieHeader = response.headers["set-cookie"][0];
          // const sessionToken = setCookieHeader.split(";")[0].split("=")[1]
          const sessionToken = setCookieHeader;
          try {
            await AsyncStorage.setItem("sessionToken", sessionToken);
          } catch (error) {
            console.log(error);
          }
          // setLogged(true); later
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleTest = async (e) => {
  //   try {
  //     const value = await AsyncStorage.getItem("sessionToken");
  //     if (value !== null) {
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
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

      <Pressable style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.text}>LOGIN</Text>
      </Pressable>

      <Pressable onPress={() => getValueFor("DEVICE_ID")} style={styles.button}>
        <Text style={styles.text}>getUUID</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 5,
    borderRadius: 10, // epic radius
    width: "50%",
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "black",
    marginLeft: "25%",
    marginRight: "25%",
    width: "50%",
    marginTop: "3%",
    marginBottom: "3%",
    borderRadius: 6,
  },
  text: {
    color: "white",
  },
});
